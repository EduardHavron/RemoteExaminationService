using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RemoteExamination.DAL.Tables;

namespace RemoteExamination.DAL.Entities
{
    [Table(TableName.Exam)]
    public class Exam
    {
        [Key] public int ExamId { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        [MaxLength(36)]
        public string ExamCreator { get; set; }

        [Required] [MaxLength(100)] public string Name { get; set; }

        public User User { get; set; }

        public ICollection<Invitation> Invitations { get; set; }

        public ICollection<ExamResult> ExamResults { get; set; }

        public ICollection<Question> Questions { get; set; }
    }
}