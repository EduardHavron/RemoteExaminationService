namespace RemoteExamination.API.ViewModels.ExamCompetitionViewModels
{
    public class ExamResultAnswerViewModel
    {
        public int ExamResultAnswerId { get; set; }

        public string Value { get; set; }

        public bool IsCorrect { get; set; }

        public bool IsTouched { get; set; }
    }
}