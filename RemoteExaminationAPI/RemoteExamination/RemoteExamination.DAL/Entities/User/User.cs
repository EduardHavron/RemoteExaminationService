using Microsoft.AspNetCore.Identity;
using RemoteExamination.DAL.Tables;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RemoteExamination.DAL.Entities
{
    [Table(TableName.User)]
    public class User : IdentityUser
    {
        [Key]
        [MaxLength(36)]
        public override string Id { get; set; }

        public ICollection<ExamResult> ExamResults { get; set; }

        public ICollection<UserAnswer> UserAnswers { get; set; }

        public ICollection<UserInvitation> UserInvitations { get; set; }
    }
}