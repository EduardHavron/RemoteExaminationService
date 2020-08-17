using System.Collections.Generic;
using System.Threading.Tasks;
using RemoteExamination.BLL.Models;
using RemoteExamination.BLL.Models.ExamCompetition;
using RemoteExamination.BLL.Models.Passport;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.BLL.Abstractions
{
    public interface IExamCompetitionService
    {
        Task CheckExamResult(ExaminerExamModel model, string user);

        Task<IList<ExamResult>> GetAllExamResults(int examId);

        Task<ExamResult> GetExamResult(int examResultId);
        
        Task<bool> RecognizePassportData(PassportRecognizeModel model);
    }
}