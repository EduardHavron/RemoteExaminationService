using System.Collections.Generic;
using System.Threading.Tasks;
using RemoteExamination.BLL.Models.ExamCompetition;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.BLL.Abstractions
{
    public interface IExamCompetitionService
    {
        Task CheckExamResult(ExamResultModel model);

        Task<IList<ExamResult>> GetAllExamResults(int examId);

        Task<ExamResult> GetExamResult(int examResultId);
    }
}