using System.Collections.Generic;

namespace RemoteExamination.BLL.Models.ExamAbstraction
{
    public interface IQuestion<TA> where TA : IAnswer
    {
        int QuestionId { get; set; }
        string QuestionMessage { get; set; }
        List<TA> Answers { get; set; }
    }
}