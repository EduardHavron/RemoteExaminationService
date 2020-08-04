using System.Collections.Generic;
using System.Threading.Tasks;
using RemoteExamination.BLL.Models;
using RemoteExamination.BLL.Models.Admin;

namespace RemoteExamination.BLL.Abstractions
{
    public interface IAdminService
    {
        Task EditUser(UpdatedAdminUserModel userModel);

        Task RemoveUser(string userId);

        Task<string> CreateBackup(string rootPath);

        Task<int> ExecuteQuery(string query);

        Task<List<AdminUserModel>> GetUsers();

        Task<AdminUserModel> GetUser(string userId);
    }
}