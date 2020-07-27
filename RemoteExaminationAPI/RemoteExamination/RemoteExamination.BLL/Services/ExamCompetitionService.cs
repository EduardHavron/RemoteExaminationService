using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models;
using RemoteExamination.BLL.Models.ExamCompetition;
using RemoteExamination.DAL.Context;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.BLL.Services
{
    public class ExamCompetitionService : IExamCompetitionService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public ExamCompetitionService(IMapper mapper, AppDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task CheckExamResult(ExaminerExamModel model, string currentUser)
        {
            double finalResult= 0;
            var checkedExam = _mapper.Map<ExaminerExamModel>(_dbContext
                .Exams
                .Include("Questions.Answers")
                .FirstOrDefaultAsync(exam => exam.ExamId == model.ExamId).Result);
            var examResultModel = new ExamResultModel
            {
                ExamId = model.ExamId,
                ExamResultDate = DateTime.Now,
                UserId = currentUser,
                UserEmail = _dbContext.Users
                    .FirstOrDefaultAsync(x => 
                        x.Id == currentUser).Result.Email
            };
            foreach (var question in model.Questions)
            {
                var checkedQuestion =
                    checkedExam.Questions.FirstOrDefault(questionModel =>
                        questionModel.QuestionId == question.QuestionId);
                if (checkedQuestion is null)
                {
                    throw new Exception("Checked question not found");
                }
                var examResultQuestion = new ExamResultQuestionModel
                {
                    ExamResultQuestionId = checkedQuestion.QuestionId,
                    Question = checkedQuestion.QuestionMessage
                };
                var correctlyAnswered = false;
                foreach (var answer in question.Answers)
                {
                    var checkedAnswer =
                        checkedQuestion.Answers
                            .FirstOrDefault(answerModel => 
                                answerModel.AnswerId == answer.AnswerId);
                    if (checkedAnswer is null)
                    {
                        throw new Exception("Checked answer not found");
                    }
                    var examResultAnswerModel = new ExamResultAnswerModel
                    {
                        IsCorrect = checkedAnswer.IsCorrect,
                        IsTouched = answer.IsCorrect,
                        Value = checkedAnswer.Value
                    };
                    if (answer.IsCorrect == checkedAnswer.IsCorrect)
                    {
                        correctlyAnswered = true;
                        examResultQuestion.ExamResultAnswerModels.Add(examResultAnswerModel);
                    }
                    else
                    {
                        correctlyAnswered = false;
                        examResultQuestion.ExamResultAnswerModels.Add(examResultAnswerModel);
                        break;
                    }
                }
                if (correctlyAnswered)
                {
                    finalResult++;
                }
                examResultModel.ExamResultQuestionModels.Add(examResultQuestion);
            }

            examResultModel.ExamResultInPercent =
                (finalResult / examResultModel.ExamResultQuestionModels.Count)
                .ToString("P", CultureInfo.InvariantCulture);
            var result = _mapper.Map<ExamResult>(examResultModel);
            await _dbContext.ExamResults.AddAsync(result);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IList<ExamResult>> GetAllExamResults(int examId)
        {
            var result = await _dbContext.ExamResults.Where(x => x.ExamId == examId).ToListAsync();

            return result;
        }

        public async Task<ExamResult> GetExamResult(int examResultId)
        {
            var result = await _dbContext.ExamResults.FirstOrDefaultAsync(x => x.ExamResultId == examResultId);

            return result;
        }
    }
}
