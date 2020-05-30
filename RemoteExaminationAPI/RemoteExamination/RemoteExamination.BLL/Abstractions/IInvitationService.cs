using RemoteExamination.BLL.Models.Invitation;
using RemoteExamination.BLL.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RemoteExamination.BLL.Abstractions
{
    public interface IInvitationService
    {
        Task<IList<int>> GetUserInvitations(string userId);

        Task CreateInvitation(InvitationModel model);

        Task AddInviteToUser(InvitationModel model, UserData user);
    }
}