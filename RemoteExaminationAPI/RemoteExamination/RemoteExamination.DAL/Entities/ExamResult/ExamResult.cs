using System;
using RemoteExamination.DAL.Tables;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RemoteExamination.DAL.Entities
{
    [Table(TableName.ExamResult)]
    public class ExamResult
    {
        [Key]
        public int ExamResultId { get; set; }

        public int ExamId { get; set; }

        public Exam Exam { get; set; }

        public string UserId { get; set; }
        
        public string UserEmail { get; set; }

        public User User { get; set; }

        public ICollection<ExamResultQuestion> ExamResultQuestions { get; set; }

        public DateTime ExamResultDate { get; set; }

        public string ExamResultInPercent { get; set; }
    }
}