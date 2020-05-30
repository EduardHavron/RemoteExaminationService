using RemoteExamination.DAL.Tables;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RemoteExamination.DAL.Entities
{
    [Table(TableName.UserAnswer)]
    public class UserAnswer
    {
        [Key]
        public int UserAnswerId { get; set; }

        [MaxLength(36)]
        public string UserId { get; set; }

        public User User { get; set; }

        public int ExamResultId { get; set; }

        public ExamResult ExamResult { get; set; }

        public string Question { get; set; }

        public string SelectedAnswer { get; set; }

        public bool IsCorrect { get; set; }
    }
}