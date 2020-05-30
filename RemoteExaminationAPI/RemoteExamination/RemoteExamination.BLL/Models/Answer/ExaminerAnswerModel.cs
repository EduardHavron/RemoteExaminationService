using RemoteExamination.BLL.Models.ExamAbstraction;

namespace RemoteExamination.BLL.Models
{
    public class ExaminerAnswerModel : IAnswer
    {
        public int AnswerId { get; set; }
        public string Value { get; set; }
        public bool IsCorrect { get; set; }
    }
}