using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RemoteExamination.DAL.Tables;

namespace RemoteExamination.DAL.Entities
{
    [Table(TableName.ExamResultAnswer)]
    public class ExamResultAnswer
    {
        [Key]
            public int ExamResultAnswerId { get; set; }

            public int ExamResultQuestionId { get; set; }
            
            
            public string Value { get; set; }
            
            public bool IsCorrect { get; set; }
            
            public bool IsTouched { get; set; }
    }
}