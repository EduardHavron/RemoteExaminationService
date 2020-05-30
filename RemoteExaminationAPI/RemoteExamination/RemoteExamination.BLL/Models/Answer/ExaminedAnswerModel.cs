using RemoteExamination.BLL.Models.ExamAbstraction;

namespace RemoteExamination.BLL.Models
{
    public class ExaminedAnswerModel : IAnswer
    {
        public int AnswerId { get; set; }
        public string Value { get; set; }
    }
}