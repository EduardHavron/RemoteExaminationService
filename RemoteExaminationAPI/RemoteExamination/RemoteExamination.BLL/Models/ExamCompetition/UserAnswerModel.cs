namespace RemoteExamination.BLL.Models.ExamCompetition
{
    public class UserAnswerModel
    {
        public string Question { get; set; }

        public string SelectedAnswer { get; set; }

        public bool IsCorrect { get; set; }
    }
}