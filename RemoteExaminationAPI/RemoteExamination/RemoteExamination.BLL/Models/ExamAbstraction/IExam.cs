using System.Collections.Generic;

namespace RemoteExamination.BLL.Models.ExamAbstraction
{
    public interface IExam<TQ, TA> where TQ : IQuestion<TA> where TA : IAnswer
    {
        int ExamId { get; set; }
        string ExamCreator { get; set; }
        string Name { get; set; }
        List<TQ> Questions { get; set; }
    }
}