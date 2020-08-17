using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RemoteExamination.API.Controllers.Abstractions;
using RemoteExamination.API.ViewModels.ExamViewModels;
using RemoteExamination.API.ViewModels.PassportViewModel;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models;
using RemoteExamination.BLL.Models.Passport;
using RemoteExamination.Common.Authentication;

namespace RemoteExamination.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamCompetitionController : BaseApiController
    {
        private readonly IExamCompetitionService _examCompetitionService;
        private readonly IMapper _mapper;

        public ExamCompetitionController(IExamCompetitionService examCompetitionService, IMapper mapper)
        {
            _examCompetitionService = examCompetitionService;
            _mapper = mapper;
        }

        [HttpPost("SendResult")]
        [Authorize]
        public async Task<IActionResult> SendExamResults(ExaminerExamViewModel model)
        {
            var resultModel = _mapper.Map<ExaminerExamModel>(model);
            var user = CurrentUser.UserId;
            await _examCompetitionService.CheckExamResult(resultModel, user);
            return Ok();
        }

        [HttpGet("GetAllResults/{examId}")]
        [Authorize(Roles = Role.Admin + "," + Role.Examiner)]
        public async Task<IActionResult> GetAllExamResults(int examId)
        {
            var result = await _examCompetitionService.GetAllExamResults(examId);
            return Ok(result);
        }

        [HttpGet("GetExamResult/{examResultId}")]
        [Authorize(Roles = Role.Admin + "," + Role.Examiner)]
        public async Task<IActionResult> GetExamResult(int examResultId)
        {
            var result = await _examCompetitionService.GetExamResult(examResultId);
            return Ok(result);
        }


        [Authorize]
        [HttpPost("RecognizeData")]
        public async Task<IActionResult> CheckPassport(PassportRecognizeViewModel model)
        {
            var passportImage = _mapper.Map<PassportRecognizeModel>(model);
            passportImage.UserId = CurrentUser.UserId;
            var result = await _examCompetitionService.RecognizePassportData(passportImage);
            if (result)
                return Ok();
            return Forbid();
        }
    }
}