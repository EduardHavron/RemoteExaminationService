using System.Collections.Generic;

namespace RemoteExamination.API.ViewModels.ExamViewModels
{
    public class ExaminedQuestionViewModel
    {
        public string QuestionMessage { get; set; }
        public List<ExaminedAnswerViewModel> Answers { get; set; }

        public ExaminedQuestionViewModel()
        {
            Answers = new List<ExaminedAnswerViewModel>();
        }
    }
}