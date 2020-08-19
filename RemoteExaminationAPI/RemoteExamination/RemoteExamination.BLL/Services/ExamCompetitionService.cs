using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models;
using RemoteExamination.BLL.Models.ExamCompetition;
using RemoteExamination.BLL.Models.IoT;
using RemoteExamination.BLL.Models.Passport;
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
            double finalResult = 0;
            var checkedExam = _mapper.Map<ExaminerExamModel>(_dbContext
                .Exams
                .Include("Questions.Answers")
                .FirstOrDefaultAsync(exam => exam.ExamId == model.ExamId).Result);
            var examResultModel = new ExamResultModel
            {
                ExamId = model.ExamId,
                ExamResultDate = DateTime.UtcNow,
                ExamName = checkedExam.Name,
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
                if (checkedQuestion is null) throw new Exception("Checked question not found");
                var examResultQuestion = new ExamResultQuestionModel
                {
                    Question = checkedQuestion.QuestionMessage
                };
                var correctlyAnswered = false;
                var isFrozen = false;
                foreach (var answer in question.Answers)
                {
                    var checkedAnswer =
                        checkedQuestion.Answers
                            .FirstOrDefault(answerModel =>
                                answerModel.AnswerId == answer.AnswerId);
                    if (checkedAnswer is null) throw new Exception("Checked answer not found");
                    var examResultAnswerModel = new ExamResultAnswerModel
                    {
                        IsCorrect = checkedAnswer.IsCorrect,
                        IsTouched = answer.IsCorrect,
                        Value = checkedAnswer.Value
                    };
                    examResultQuestion.ExamResultAnswers.Add(examResultAnswerModel);
                    if (answer.IsCorrect == checkedAnswer.IsCorrect)
                    {
                        correctlyAnswered = true;
                    }
                    else
                    {
                        correctlyAnswered = false;
                        isFrozen = true;
                    }
                }

                if (correctlyAnswered && !isFrozen) finalResult++;
                examResultModel.ExamResultQuestions.Add(examResultQuestion);
            }

            examResultModel.ExamResultInPercent =
                (finalResult / examResultModel.ExamResultQuestions.Count)
                .ToString("P", CultureInfo.InvariantCulture);
            var result = _mapper.Map<ExamResult>(examResultModel);
            await _dbContext.ExamResults.AddAsync(result);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IList<ExamResult>> GetAllExamResults(int examId)
        {
            var result = await _dbContext.ExamResults
                .Where(x
                    => x.ExamId == examId).ToListAsync();

            return result;
        }

        public async Task<ExamResult> GetExamResult(int examResultId)
        {
            var result = await _dbContext.ExamResults.Include(examResult
                    => examResult.ExamResultQuestions).ThenInclude(question
                    => question.ExamResultAnswers)
                .FirstOrDefaultAsync(x
                    => x.ExamResultId == examResultId);

            return result;
        }


        public async Task<bool> RecognizePassportData(PassportRecognizeModel model)
        {
            var modelData = await ExtractPassportData(model.PassportImageBase64);
            if (modelData is null) return false;
            modelData = GetStringSha256Hash(modelData);

            var storedData = _dbContext.Users.FirstOrDefaultAsync(x => x.Id == model.UserId).Result.PassportHash;
            return storedData == modelData;
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
            return jsonResponse.Data.Result != null ? jsonResponse.Data.Result.DocumentNumber : null;
        }
        
        private string GetStringSha256Hash(string text)
        {
            if (String.IsNullOrEmpty(text))
                return String.Empty;

            using (var sha = new System.Security.Cryptography.SHA256Managed())
            {
                var textData = System.Text.Encoding.UTF8.GetBytes(text);
                var hash = sha.ComputeHash(textData);
                return BitConverter.ToString(hash).Replace("-", String.Empty);
            }
        }
    }
}