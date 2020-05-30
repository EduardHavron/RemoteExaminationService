using RemoteExamination.BLL.Models.ExamAbstraction;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RemoteExamination.BLL.Models
{
    public class ExaminedExamModel : IExam<ExaminedQuestionModel, ExaminedAnswerModel>
    {
        public int ExamId { get; set; }

        [Required]
        public string ExamCreator { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public List<ExaminedQuestionModel> Questions { get; set; }

        public ExaminedExamModel()
        {
            Questions = new List<ExaminedQuestionModel>();
        }
    }
}