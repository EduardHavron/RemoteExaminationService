using System.Collections.Generic;
using System.Threading.Tasks;
using RemoteExamination.BLL.Models;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.BLL.Abstractions
{
    public interface IExamCompetitionService
    {
        Task CheckExamResult(ExaminerExamModel model, string user);

        Task<IList<ExamResult>> GetAllExamResults(int examId);

        Task<ExamResult> GetExamResult(int examResultId);
    }
}