namespace RemoteExamination.BLL.Models.ExamCompetition
{
    public class ExamResultAnswerModel
    {
        public int ExamResultAnswerId { get; set; }

        public string Value { get; set; }

        public bool IsCorrect { get; set; }

        public bool IsTouched { get; set; }
    }
}