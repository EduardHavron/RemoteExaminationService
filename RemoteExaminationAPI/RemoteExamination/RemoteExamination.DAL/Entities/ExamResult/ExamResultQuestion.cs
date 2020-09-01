using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RemoteExamination.DAL.Tables;

namespace RemoteExamination.DAL.Entities
{
    [Table(TableName.ExamResultQuestion)]
    public class ExamResultQuestion
    {
        [Key] public int ExamResultQuestionId { get; set; }

        public int ExamResultId { get; set; }

        public ICollection<ExamResultAnswer> ExamResultAnswers { get; set; }

        public string Question { get; set; }
    }
}