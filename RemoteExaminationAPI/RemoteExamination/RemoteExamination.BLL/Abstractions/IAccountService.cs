using RemoteExamination.BLL.Models;
using System.Threading.Tasks;
using RemoteExamination.BLL.Models.Passport;

namespace RemoteExamination.BLL.Abstractions
{
    public interface IAccountService
    {
        Task<string> SignIn(string email, string password);

        Task<bool> SignUp(UserModel employee, string password, string role, string passportImage);
        
    }
}