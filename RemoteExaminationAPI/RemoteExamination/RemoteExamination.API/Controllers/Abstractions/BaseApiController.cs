using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using RemoteExamination.BLL.Helpers;
using RemoteExamination.BLL.Models.User;

namespace RemoteExamination.API.Controllers.Abstractions
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseApiController : Controller
    {
        protected UserData CurrentUser;

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            CurrentUser = AuthHelper.CreateRequestUser(HttpContext.User.Identity as ClaimsIdentity);
        }
    }
}