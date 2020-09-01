using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RemoteExamination.BLL.Models.ExamAbstraction;

namespace RemoteExamination.BLL.Models
{
    public class ExaminedExamModel : IExam<ExaminedQuestionModel, ExaminedAnswerModel>
    {
        public ExaminedExamModel()
        {
            Questions = new List<ExaminedQuestionModel>();
        }

        public int ExamId { get; set; }

        [Required] public string ExamCreator { get; set; }

        [Required] [MaxLength(100)] public string Name { get; set; }

        public List<ExaminedQuestionModel> Questions { get; set; }
    }
}