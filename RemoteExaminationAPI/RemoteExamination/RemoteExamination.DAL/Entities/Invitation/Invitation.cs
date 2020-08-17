using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RemoteExamination.DAL.Tables;

namespace RemoteExamination.DAL.Entities
{
    [Table(TableName.Invitation)]
    public class Invitation
    {
        [Key] public int InvitationId { get; set; }

        [Required] [MaxLength(100)] public string InvitationCode { get; set; }

        [ForeignKey(nameof(Exam))] public int ExamId { get; set; }

        public Exam Exam { get; set; }

        public ICollection<UserInvitation> UserInvitations { get; set; }
    }
}