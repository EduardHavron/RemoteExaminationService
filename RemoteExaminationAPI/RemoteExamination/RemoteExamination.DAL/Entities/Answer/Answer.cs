using RemoteExamination.DAL.Tables;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RemoteExamination.DAL.Entities
{
    [Table(TableName.Answer)]
    public class Answer
    {
        [Key]
        public int AnswerId { get; set; }

        [ForeignKey(nameof(Question))]
        public int QuestionId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Value { get; set; }

        public bool IsCorrect { get; set; }

        public Question Question { get; set; }
    }
}