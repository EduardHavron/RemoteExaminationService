using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models.Invitation;
using RemoteExamination.BLL.Models.User;
using RemoteExamination.DAL.Context;
using RemoteExamination.DAL.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RemoteExamination.BLL.Services
{
    public class InvitationService : IInvitationService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public InvitationService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IList<int>> GetUserInvitations(string userId)
        {
            if (userId is null)
            {
                return null;
            }
            var invitationsList = new List<int>();
            var userInvitations = await _dbContext.UserInvitations
                .AsNoTracking()
                .Where(x => x.UserId == userId)
                .ToListAsync();
            foreach (var invitation in userInvitations)
            {
                invitationsList.Add(invitation.InvitationId);
            }

            return invitationsList;
        }

        public async Task CreateInvitation(InvitationModel model)
        {
            var invitation = _mapper.Map<Invitation>(model);

            await _dbContext.Invitations.AddAsync(invitation);

            await _dbContext.SaveChangesAsync();
        }

        public async Task AddInviteToUser(InvitationModel model, UserData userData)
        {
            var invitation = await _dbContext.Invitations.FirstOrDefaultAsync(x => x.InvitationCode == model.InvitationCode);
            if (invitation is null)
            {
                return;
            }
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userData.UserName);
            var userInvitation = new UserInvitation
            {
                InvitationId = invitation.InvitationId,
                UserId = user.Id
            };
            await _dbContext.UserInvitations.AddAsync(userInvitation);
            await _dbContext.SaveChangesAsync();
        }
    }
}