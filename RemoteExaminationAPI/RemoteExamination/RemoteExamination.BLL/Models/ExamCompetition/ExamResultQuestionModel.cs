using System.Collections.Generic;

namespace RemoteExamination.BLL.Models.ExamCompetition
{
    public class ExamResultQuestionModel
    {
        public ExamResultQuestionModel()
        {
            ExamResultAnswers = new List<ExamResultAnswerModel>();
        }

        public int ExamResultQuestionId { get; set; }

        public int ExamResultId { get; set; }

        public string Question { get; set; }

        public List<ExamResultAnswerModel> ExamResultAnswers { get; set; }
    }
}