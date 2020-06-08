using System;
using System.Collections.Generic;

namespace RemoteExamination.API.ViewModels.ExamCompetitionViewModels
{
    public class ExamResultViewModel
    {
        public int ExamResultId { get; set; }

        public int ExamId { get; set; }

        public List<UserAnswerViewModel> UserAnswers { get; set; }

        public string ExamResultDate { get; set; }

        public string ExamResultInPercent { get; set; }

        public ExamResultViewModel()
        {
            UserAnswers = new List<UserAnswerViewModel>();
        }
    }
}