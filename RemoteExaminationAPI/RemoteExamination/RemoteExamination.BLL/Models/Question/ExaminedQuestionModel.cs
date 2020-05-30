using RemoteExamination.BLL.Models.ExamAbstraction;
using System.Collections.Generic;

namespace RemoteExamination.BLL.Models
{
    public class ExaminedQuestionModel : IQuestion<ExaminedAnswerModel>
    {
        public int QuestionId { get; set; }
        public string QuestionMessage { get; set; }
        public List<ExaminedAnswerModel> Answers { get; set; }

        public ExaminedQuestionModel()
        {
            Answers = new List<ExaminedAnswerModel>();
        }
    }
}