using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RemoteExamination.API.Controllers.Abstractions;
using RemoteExamination.API.ViewModels.InvitationViewModels;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models.Invitation;
using RemoteExamination.Common.Authentication;
using System.Threading.Tasks;

namespace RemoteExamination.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationController : BaseApiController
    {
        private readonly IInvitationService _invitationService;
        private readonly IMapper _mapper;

        public InvitationController(IInvitationService invitationService, IMapper mapper)
        {
            _invitationService = invitationService;
            _mapper = mapper;
        }

        [HttpPost("CreateInvite")]
        [Authorize(Roles = Role.Admin + "," + Role.Examiner)]
        public async Task<IActionResult> CreateInvite(InvitationViewModel model)
        {
            var inviteModel = _mapper.Map<InvitationModel>(model);

            await _invitationService.CreateInvitation(inviteModel);

            return Ok();
        }

        [HttpPost("AddInviteToUser")]
        [Authorize(Roles = Role.Admin + "," + Role.Examined)]
        public async Task<IActionResult> AddInviteToUser(ApplyInvitationViewModel model)
        {
            var invitationModel = _mapper.Map<InvitationModel>(model);

            await _invitationService.AddInviteToUser(invitationModel, CurrentUser);

            return Ok();
        }
    }
}