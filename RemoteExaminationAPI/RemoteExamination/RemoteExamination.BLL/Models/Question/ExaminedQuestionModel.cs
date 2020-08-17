using System.Collections.Generic;
using RemoteExamination.BLL.Models.ExamAbstraction;

namespace RemoteExamination.BLL.Models
{
    public class ExaminedQuestionModel : IQuestion<ExaminedAnswerModel>
    {
        public ExaminedQuestionModel()
        {
            Answers = new List<ExaminedAnswerModel>();
        }

        public int QuestionId { get; set; }
        public string QuestionMessage { get; set; }
        public List<ExaminedAnswerModel> Answers { get; set; }
    }
}