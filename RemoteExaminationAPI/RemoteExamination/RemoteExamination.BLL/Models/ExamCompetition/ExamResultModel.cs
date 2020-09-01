using System;
using System.Collections.Generic;

namespace RemoteExamination.BLL.Models.ExamCompetition
{
    public class ExamResultModel
    {
        public ExamResultModel()
        {
            ExamResultQuestions = new List<ExamResultQuestionModel>();
        }

        public int ExamResultId { get; set; }

        public int ExamId { get; set; }

        public string ExamName { get; set; }

        public DateTime ExamResultDate { get; set; }

        public string UserId { get; set; }

        public string UserEmail { get; set; }

        public List<ExamResultQuestionModel> ExamResultQuestions { get; set; }

        public string ExamResultInPercent { get; set; }
    }
}