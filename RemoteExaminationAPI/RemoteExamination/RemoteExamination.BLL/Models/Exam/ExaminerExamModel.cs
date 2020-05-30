using RemoteExamination.BLL.Models.ExamAbstraction;
using System.Collections.Generic;

namespace RemoteExamination.BLL.Models
{
    public class ExaminerExamModel : IExam<ExaminerQuestionModel, ExaminerAnswerModel>
    {
        public int ExamId { get; set; }

        public string ExamCreator { get; set; }

        public string Name { get; set; }

        public List<ExaminerQuestionModel> Questions { get; set; }

        public ExaminerExamModel()
        {
            Questions = new List<ExaminerQuestionModel>();
        }
    }
}