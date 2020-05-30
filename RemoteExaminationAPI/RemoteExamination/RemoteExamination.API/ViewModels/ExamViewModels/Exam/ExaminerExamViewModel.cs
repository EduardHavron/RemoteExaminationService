using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RemoteExamination.API.ViewModels.ExamViewModels
{
    public class ExaminerExamViewModel
    {
        [Required]
        public int ExamId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public List<ExaminerQuestionViewModel> Questions { get; set; }

        public ExaminerExamViewModel()
        {
            Questions = new List<ExaminerQuestionViewModel>();
        }
    }
}