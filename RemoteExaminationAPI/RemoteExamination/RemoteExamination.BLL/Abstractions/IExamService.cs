using System.Collections.Generic;
using System.Threading.Tasks;
using RemoteExamination.BLL.Models;
using RemoteExamination.BLL.Models.ExamAbstraction;
using RemoteExamination.BLL.Models.User;

namespace RemoteExamination.BLL.Abstractions
{
    public interface IExamService
    {
        Task<IList<TE>> GetAllExamsAsync<TE, TQ, TA>(UserData currentUser) where TE : IExam<TQ, TA>
            where TQ : IQuestion<TA>
            where TA : IAnswer;

        Task<TE> GetExamAsync<TE, TQ, TA>(int id, UserData currentUser) where TE : IExam<TQ, TA>
            where TQ : IQuestion<TA>
            where TA : IAnswer;

        Task CreateExamAsync(ExaminerExamModel model);

        Task UpdateExamAsync(ExaminerExamModel model);

        Task DeleteExamAsync(int id);
    }
}