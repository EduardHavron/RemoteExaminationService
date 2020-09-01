using System.Collections.Generic;

namespace RemoteExamination.API.ViewModels.ExamCompetitionViewModels
{
    public class ExamResultQuestionViewModel
    {
        public int ExamResultQuestionId { get; set; }

        public List<ExamResultViewModel> ExamResultAnswers { get; set; }

        public string Question { get; set; }
    }
}