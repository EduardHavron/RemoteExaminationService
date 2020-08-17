using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RemoteExamination.API.Controllers.Abstractions;
using RemoteExamination.API.ViewModels.AccountViewModels;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models;
using RemoteExamination.Common.Authentication;

namespace RemoteExamination.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseApiController
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public AccountController(IAccountService accountService, IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInViewModel model)
        {
            var token = await _accountService.SignIn(model.Email, model.Password);

            return Ok(new {Token = token});
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> Create(SignUpViewModel model)
        {
            var userModel = _mapper.Map<UserModel>(model);
            var role = model.Role ? Role.Examiner : Role.Examined;
            var result = await _accountService.SignUp(userModel, model.Password, role, model.PassportHash);
            if (result)
                return Ok();
            return BadRequest();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost("SignUpAdmin")]
        public async Task<IActionResult> CreateAdmin(SignUpAdminViewModel model)
        {
            var adminModel = _mapper.Map<UserModel>(model);
            await _accountService.SignUp(adminModel, model.Password, Role.Admin, null);

            return Ok();
        }
    }
}