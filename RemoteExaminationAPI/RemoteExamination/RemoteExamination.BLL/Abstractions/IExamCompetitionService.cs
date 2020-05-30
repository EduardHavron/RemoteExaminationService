using System.Threading.Tasks;
using RemoteExamination.BLL.Models.ExamCompetition;

namespace RemoteExamination.BLL.Abstractions
{
    public interface IExamCompetitionService
    {
        Task CheckExamResult(ExamResultModel model);
    }
}