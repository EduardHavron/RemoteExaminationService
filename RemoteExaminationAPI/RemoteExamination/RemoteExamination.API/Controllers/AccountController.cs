using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RemoteExamination.API.Controllers.Abstractions;
using RemoteExamination.API.ViewModels.AccountViewModels;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models;
using RemoteExamination.Common.Authentication;
using System.Threading.Tasks;

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

            return Ok(new { token });
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> Create(SignUpViewModel model)
        {
            var userModel = _mapper.Map<UserModel>(model);
            string role;
            if (model.Role)
            {
                role = Role.Examiner;
            }
            else
            {
                role = Role.Examined;
            }
            await _accountService.SignUp(userModel, model.Password, role);

            return NoContent();
        }
    }
}