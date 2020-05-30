using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models;
using RemoteExamination.Common.Authentication;
using RemoteExamination.Common.Exceptions;
using RemoteExamination.DAL.Entities;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RemoteExamination.BLL.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JwtSettings _jwtSettings;
        private readonly IMapper _mapper;

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

            if (user is null || (!await _userManager.CheckPasswordAsync(user, password)))
            {
                throw new BusinessLogicException("Email or password is incorrect.");
            }

            var token = await GenerateToken(user);

            return token;
        }

        public async Task SignUp(UserModel model, string password, string role)
        {
            var user = _mapper.Map<User>(model);
            user.Id = Guid.NewGuid().ToString();
            user.UserName = user.Email;
            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
                throw new BusinessLogicException(string.Join("\n", result.Errors.Select(x => x.Description)));

            await CheckRoleExists(role);

            await _userManager.AddToRoleAsync(user, role);
        }

        private async Task<string> GenerateToken(User user)
        {
            var claims = (await _userManager.GetRolesAsync(user))
                .Select(x => new Claim(ClaimsIdentity.DefaultRoleClaimType, x))
                .ToList();

            claims.Add(new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id));
            var expires = DateTime.Now.AddHours(2);
            var signKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var credentials = new SigningCredentials(signKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: expires,
                signingCredentials: credentials);

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            return jwtToken;
        }

        private async Task CheckRoleExists(string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        public async Task<bool> CheckUserInRole(string userId, string role)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (await _userManager.IsInRoleAsync(user, "Admin"))
            {
                return true;
            }
            return await _userManager.IsInRoleAsync(user, role);
        }
    }
}