using RemoteExamination.BLL.Models.ExamAbstraction;
using System.Collections.Generic;

namespace RemoteExamination.BLL.Models
{
    public class ExaminerQuestionModel : IQuestion<ExaminerAnswerModel>
    {
        public int QuestionId { get; set; }
        public string QuestionMessage { get; set; }
        public List<ExaminerAnswerModel> Answers { get; set; }

        public ExaminerQuestionModel()
        {
            Answers = new List<ExaminerAnswerModel>();
        }
    }
}