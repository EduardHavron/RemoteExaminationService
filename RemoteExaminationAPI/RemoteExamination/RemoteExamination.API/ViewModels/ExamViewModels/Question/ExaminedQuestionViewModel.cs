using System.Collections.Generic;

namespace RemoteExamination.API.ViewModels.ExamViewModels
{
    public class ExaminedQuestionViewModel
    {
        public ExaminedQuestionViewModel()
        {
            Answers = new List<ExaminedAnswerViewModel>();
        }

        public int QuestionId { get; set; }
        public string QuestionMessage { get; set; }
        public List<ExaminedAnswerViewModel> Answers { get; set; }
    }
}