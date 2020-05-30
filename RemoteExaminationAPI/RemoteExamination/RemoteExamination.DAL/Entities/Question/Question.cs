using RemoteExamination.DAL.Tables;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RemoteExamination.DAL.Entities
{
    [Table(TableName.Question)]
    public class Question
    {
        [Key]
        public int QuestionId { get; set; }

        [ForeignKey(nameof(Exam))]
        public int ExamId { get; set; }

        [Required]
        [MaxLength(300)]
        public string QuestionMessage { get; set; }

        public ICollection<Answer> Answers { get; set; }
        public Exam Exam { get; set; }
    }
}