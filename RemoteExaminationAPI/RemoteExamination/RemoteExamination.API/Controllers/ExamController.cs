using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RemoteExamination.API.Controllers.Abstractions;
using RemoteExamination.API.ViewModels.ExamViewModels;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models;
using RemoteExamination.Common.Authentication;
using System.Threading.Tasks;

namespace RemoteExamination.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : BaseApiController
    {
        private readonly IExamService _examService;
        private readonly IMapper _mapper;

        public ExamController(IExamService examService, IMapper mapper)
        {
            _examService = examService;
            _mapper = mapper;
        }

        [HttpGet("GetExams")]
        [Authorize]
        public async Task<IActionResult> All()
        {
            if (CurrentUser.UserRoles == Role.Admin || CurrentUser.UserRoles == Role.Examiner)
            {
                var exams = await _examService.GetAllExamsAsync
                    <ExaminerExamModel, ExaminerQuestionModel, ExaminerAnswerModel>(CurrentUser);
                if (exams == null)
                {
                    return NoContent();
                }

                return Ok(exams);
            }
            else
            {
                var exams = await _examService.GetAllExamsAsync
                    <ExaminedExamModel, ExaminedQuestionModel, ExaminedAnswerModel>(CurrentUser);
                if (exams == null)
                {
                    return NoContent();
                }

                return Ok(exams);
            }
        }

        [HttpGet("GetExam/{examId}")]
        [Authorize]
        public async Task<IActionResult> Get(int examId)
        {
            if (CurrentUser.UserRoles == Role.Admin || CurrentUser.UserRoles == Role.Examiner)
            {
                var exam =
                   await _examService.GetExamAsync<ExaminerExamModel, ExaminerQuestionModel, ExaminerAnswerModel>(examId,
                        CurrentUser);
                if (exam == null)
                {
                    return NoContent();
                }

                return Ok(exam);
            }
            else
            {
                var exam =
                    await _examService.GetExamAsync<ExaminedExamModel, ExaminedQuestionModel, ExaminedAnswerModel>(examId,
                        CurrentUser);
                if (exam == null)
                {
                    return NoContent();
                }

                return Ok(exam);
            }
        }

        [HttpPost("CreateExam")]
        [Authorize]
        public async Task<IActionResult> Create(ExaminerExamViewModel model)
        {
            var examModel = _mapper.Map<ExaminerExamModel>(model);
            examModel.ExamCreator = CurrentUser.UserName;
            await _examService.CreateExamAsync(examModel);

            return Ok();
        }

        [HttpPut("EditExam")]
        [Authorize]
        public async Task<IActionResult> Put(ExaminerExamViewModel model)
        {
            var examModel = _mapper.Map<ExaminerExamModel>(model);

            await _examService.UpdateExamAsync(examModel);

            return Ok();
        }

        [HttpDelete("DeleteExam")]
        [Authorize]
        public async Task<IActionResult> Delete(int examId)
        {
            await _examService.DeleteExamAsync(examId);

            return Ok();
        }
    }
}