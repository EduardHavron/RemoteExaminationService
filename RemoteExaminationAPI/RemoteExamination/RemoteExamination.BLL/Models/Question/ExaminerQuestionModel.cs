using System.Collections.Generic;
using RemoteExamination.BLL.Models.ExamAbstraction;

namespace RemoteExamination.BLL.Models
{
    public class ExaminerQuestionModel : IQuestion<ExaminerAnswerModel>
    {
        public ExaminerQuestionModel()
        {
            Answers = new List<ExaminerAnswerModel>();
        }

        public int QuestionId { get; set; }
        public string QuestionMessage { get; set; }
        public List<ExaminerAnswerModel> Answers { get; set; }
    }
}