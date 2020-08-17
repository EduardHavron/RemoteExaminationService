using System.Collections.Generic;
using RemoteExamination.BLL.Models.ExamAbstraction;

namespace RemoteExamination.BLL.Models
{
    public class ExaminerExamModel : IExam<ExaminerQuestionModel, ExaminerAnswerModel>
    {
        public ExaminerExamModel()
        {
            Questions = new List<ExaminerQuestionModel>();
        }

        public int ExamId { get; set; }

        public string ExamCreator { get; set; }

        public string Name { get; set; }

        public List<ExaminerQuestionModel> Questions { get; set; }
    }
}