using System;
using System.Collections.Generic;

namespace RemoteExamination.BLL.Models.ExamCompetition
{
    public class ExamResultModel
    {
        public int ExamResultId { get; set; }

        public int ExamId { get; set; }

        public DateTime ExamResultDate { get; set; }

        public string UserId { get; set; }

        public List<UserAnswerModel> UserAnswers { get; set; }

        public string ExamResultInPercent { get; set; }

        public ExamResultModel()
        {
            UserAnswers = new List<UserAnswerModel>();
        }
    }
}