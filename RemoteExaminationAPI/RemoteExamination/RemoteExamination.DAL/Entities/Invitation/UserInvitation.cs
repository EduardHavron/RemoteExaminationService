using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace RemoteExamination.DAL.Entities
{
    public class UserInvitation
    {
        [Key]
        public int UserInvitationId { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }

        public int InvitationId { get; set; }
        public Invitation Invitation { get; set; }
    }
}