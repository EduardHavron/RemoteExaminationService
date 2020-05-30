using RemoteExamination.BLL.Models;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.BLL.Mapping
{
    public static class ExamServiceMapper
    {
        public static ExaminerExamModel Map(Exam exam) =>
            new ExaminerExamModel
            {
                ExamCreator = exam.ExamCreator,
                ExamId = exam.ExamId,
                Name = exam.Name
            };

        public static Exam Map(ExaminerExamModel model) =>
            new Exam
            {
                ExamCreator = model.ExamCreator,
                ExamId = model.ExamId,
                Name = model.Name
            };
    }
}