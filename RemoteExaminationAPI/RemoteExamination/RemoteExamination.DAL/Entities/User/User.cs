using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using RemoteExamination.DAL.Tables;

namespace RemoteExamination.DAL.Entities
{
    [Table(TableName.User)]
    public class User : IdentityUser
    {
        [Key] [MaxLength(36)] public override string Id { get; set; }

        public ICollection<ExamResult> ExamResults { get; set; }

        public ICollection<UserInvitation> UserInvitations { get; set; }
    }
}