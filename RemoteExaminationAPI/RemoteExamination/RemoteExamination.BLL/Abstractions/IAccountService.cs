using System.Threading.Tasks;
using RemoteExamination.BLL.Models;

namespace RemoteExamination.BLL.Abstractions
{
    public interface IAccountService
    {
        Task<string> SignIn(string email, string password);

        Task SignUp(UserModel employee, string password, string role);
    }
}