using System.Collections.Generic;

namespace RemoteExamination.API.ViewModels.ExamCompetitionViewModels
{
    public class ExamResultViewModel
    {
        public ExamResultViewModel()
        {
            ExamResultQuestions = new List<ExamResultQuestionViewModel>();
        }

        public int ExamResultId { get; set; }

        public int ExamId { get; set; }

        public string ExamName { get; set; }

        public string UserEmail { get; set; }

        public List<ExamResultQuestionViewModel> ExamResultQuestions { get; set; }

        public string ExamResultDate { get; set; }

        public string ExamResultInPercent { get; set; }
    }
}