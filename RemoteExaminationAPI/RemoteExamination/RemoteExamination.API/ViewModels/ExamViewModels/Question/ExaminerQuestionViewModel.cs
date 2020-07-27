using System.Collections.Generic;

namespace RemoteExamination.API.ViewModels.ExamViewModels
{
    public class ExaminerQuestionViewModel
    {
        public int QuestionId { get; set; }
        public string QuestionMessage { get; set; }
        public List<ExaminerAnswerViewModel> Answers { get; set; }
    }
}