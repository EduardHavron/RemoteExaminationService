using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RemoteExamination.API.ViewModels.ExamViewModels
{
    public class ExaminedExamViewModel
    {
        public ExaminedExamViewModel()
        {
            Questions = new List<ExaminedQuestionViewModel>();
        }

        public int ExamId { get; set; }

        [Required] [MaxLength(100)] public string Name { get; set; }

        public List<ExaminedQuestionViewModel> Questions { get; set; }
    }
}