namespace RemoteExamination.API.ViewModels.ExamCompetitionViewModels
{
    public class UserAnswerViewModel
    {
        public string Question { get; set; }

        public string SelectedAnswer { get; set; }

        public bool IsCorrect { get; set; }
    }
}