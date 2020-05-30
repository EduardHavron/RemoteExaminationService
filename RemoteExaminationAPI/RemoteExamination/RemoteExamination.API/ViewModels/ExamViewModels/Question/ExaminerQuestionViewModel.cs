using System.Collections.Generic;

namespace RemoteExamination.API.ViewModels.ExamViewModels
{
    public class ExaminerQuestionViewModel
    {
        public string QuestionMessage { get; set; }
        public List<ExaminerAnswerViewModel> Answers { get; set; }
    }
}