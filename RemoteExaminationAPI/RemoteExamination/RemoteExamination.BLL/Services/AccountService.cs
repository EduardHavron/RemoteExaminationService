using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models;
using RemoteExamination.BLL.Models.IoT;
using RemoteExamination.Common.Authentication;
using RemoteExamination.Common.Exceptions;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.BLL.Services
{
    public class AccountService : IAccountService
    {
        private readonly JwtSettings _jwtSettings;
        private readonly IMapper _mapper;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;

        public AccountService(UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IOptions<JwtSettings> jwtOptions,
            IMapper mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtSettings = jwtOptions.Value;
            _mapper = mapper;
        }

        public async Task<string> SignIn(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user is null || !await _userManager.CheckPasswordAsync(user, password))
                throw new BusinessLogicException("Email or password is incorrect.");

            var token = await GenerateToken(user);

            return token;
        }

        public async Task<bool> SignUp(UserModel model, string password, string role, string passportImage)
        {
            var user = _mapper.Map<User>(model);
            user.Id = Guid.NewGuid().ToString();
            user.UserName = user.Email;
            user.PassportHash = await ExtractPassportData(passportImage);
            if (user.PassportHash is null) return false;

            using (HashAlgorithm algorithm = SHA256.Create())
            {
                user.PassportHash = algorithm
                    .ComputeHash(Encoding.UTF8.GetBytes(user.PassportHash))
                    .ToString();
            }

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
                throw new BusinessLogicException(string.Join("\n", result.Errors.Select(x => x.Description)));

            await CheckRoleExists(role);

            await _userManager.AddToRoleAsync(user, role);
            return true;
        }

        private async Task<string> GenerateToken(User user)
        {
            var claims = (await _userManager.GetRolesAsync(user))
                .Select(x => new Claim(ClaimsIdentity.DefaultRoleClaimType, x))
                .ToList();
            claims.Add(new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id));
            var expires = DateTime.Now.AddDays(365);
            var signKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var credentials = new SigningCredentials(signKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _jwtSettings.Issuer,
                _jwtSettings.Audience,
                claims,
                expires: expires,
                signingCredentials: credentials);

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            return jwtToken;
        }

        private async Task CheckRoleExists(string role)
        {
            if (!await _roleManager.RoleExistsAsync(role)) await _roleManager.CreateAsync(new IdentityRole(role));
        }

        public async Task<bool> CheckUserInRole(string userId, string role)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (await _userManager.IsInRoleAsync(user, Role.Admin)) return true;
            return await _userManager.IsInRoleAsync(user, role);
        }

        private async Task<string> ExtractPassportData(string passportImage)
        {
            var json = JsonConvert.SerializeObject(new {base64file = passportImage});
            var data = new StringContent(json,
                Encoding.UTF8,
                "application/json");
            using var httpClient = new HttpClient();
            var responseMessage = await httpClient.PostAsync("https://resiot.azurewebsites.net/api/parse", data);
            if (responseMessage.StatusCode != HttpStatusCode.OK || responseMessage.Content.ToString() == null)
                return null;
            var jsonResponse =
                JsonConvert.DeserializeObject<IotResult>(await responseMessage.Content.ReadAsStringAsync());
            return jsonResponse?.Data.Result.DocumentNumber;
        }
    }
}