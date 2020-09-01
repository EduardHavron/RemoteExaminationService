using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RemoteExamination.API.ViewModels.ExamViewModels
{
    public class ExaminerExamViewModel
    {
        public ExaminerExamViewModel()
        {
            Questions = new List<ExaminerQuestionViewModel>();
        }

        [Required] public int ExamId { get; set; }

        [Required] [MaxLength(100)] public string Name { get; set; }

        public List<ExaminerQuestionViewModel> Questions { get; set; }
    }
}