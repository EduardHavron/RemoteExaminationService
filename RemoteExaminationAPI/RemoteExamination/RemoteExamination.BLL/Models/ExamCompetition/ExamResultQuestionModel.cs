using System.Collections.Generic;

namespace RemoteExamination.BLL.Models.ExamCompetition
{
    public class ExamResultQuestionModel
    {
        public int ExamResultQuestionId { get; set; }

        public int ExamResultId { get; set; }

        public string Question { get; set; }
        
        public List<ExamResultAnswerModel> ExamResultAnswerModels { get; set; }

        public ExamResultQuestionModel()
        {
            ExamResultAnswerModels = new List<ExamResultAnswerModel>();
        }
    }
}