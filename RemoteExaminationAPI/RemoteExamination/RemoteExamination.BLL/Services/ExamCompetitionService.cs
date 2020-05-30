using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RemoteExamination.BLL.Abstractions;
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

        public async Task CheckExamResult(ExamResultModel model)
        {
            var examResult = _mapper.Map<ExamResult>(model);
            var examQuestions = await _dbContext.Questions.Include("Answers").Where(x => x.ExamId == model.ExamId).ToListAsync();
            var examSummary = 0;
            var examMax = examQuestions.Count;
            foreach (var modelAnswer in model.UserAnswers)
            {
                var currentQuestion = examQuestions.FirstOrDefault(x => x.QuestionMessage == modelAnswer.Question);
                if (currentQuestion is null)
                {
                    throw new Exception("Question not found, there is something wrong with result model");
                }

                var currentAnswer = currentQuestion.Answers.FirstOrDefault(x => x.Value == modelAnswer.SelectedAnswer);
                if (currentAnswer is null)
                {
                    throw new Exception("Answer not found, there is something wrong with result model");
                }

                if (currentAnswer.IsCorrect && modelAnswer.IsCorrect)
                {
                    examSummary++;
                }
            }

            var examPercent = examSummary / examMax;
            examResult.ExamResultInPercent = (examPercent * 100).ToString("##.00");
            await _dbContext.ExamResults.AddAsync(examResult);
            await _dbContext.SaveChangesAsync();
        }
    }
}
