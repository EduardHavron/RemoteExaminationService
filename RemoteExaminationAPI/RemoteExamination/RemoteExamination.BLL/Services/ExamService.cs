using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models;
using RemoteExamination.BLL.Models.ExamAbstraction;
using RemoteExamination.BLL.Models.User;
using RemoteExamination.Common.Authentication;
using RemoteExamination.Common.Exceptions.BLL;
using RemoteExamination.DAL.Context;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.BLL.Services
{
    public class ExamService : IExamService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public ExamService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IList<TE>> GetAllExamsAsync<TE, TQ, TA>(UserData currentUser) where TE : IExam<TQ, TA>
            where TQ : IQuestion<TA>
            where TA : IAnswer
        {
            List<Exam> exams;
            switch (currentUser.UserRoles)
            {
                case Role.Admin:
                {
                    exams = await _dbContext.Exams
                        .Include("Questions.Answers").AsNoTracking()
                        .AsNoTracking()
                        .ToListAsync();
                    break;
                }

                case Role.Examiner:
                {
                    exams = await _dbContext.Exams.Include("Questions.Answers").AsNoTracking()
                        .Where(x => x.ExamCreator == currentUser.UserId)
                        .ToListAsync();
                    break;
                }

                case Role.Examined:
                {
                    var examsId = await _dbContext.UserInvitations
                        .Include(x => x.Invitation)
                        .AsNoTracking()
                        .Where(x => x.UserId == currentUser.UserId)
                        .Select(x => x.Invitation.ExamId)
                        .ToListAsync();
                    exams = await _dbContext.Exams
                        .Include("Questions.Answers")
                        .Where(x => examsId.Contains(x.ExamId))
                        .ToListAsync();
                    break;
                }
                default:
                {
                    return null;
                }
            }

            var examsModel = exams
                .Select(x => _mapper.Map<TE>(x))
                .ToList();

            return examsModel;
        }

        public async Task<TE> GetExamAsync<TE, TQ, TA>(int id, UserData currentUser) where TE : IExam<TQ, TA>
            where TQ : IQuestion<TA>
            where TA : IAnswer
        {
            var exam = await _dbContext.Exams.Include("Questions.Answers")
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.ExamId == id);
            switch (currentUser.UserRoles)
            {
                case "Admin":
                    break;

                case "Examiner":
                    if (exam.ExamCreator != currentUser.UserId)
                        exam = null;
                    break;

                case "Examined":
                    var examsId = await _dbContext.UserInvitations
                        .Include(x => x.Invitation)
                        .AsNoTracking()
                        .Where(x => x.UserId == currentUser.UserId)
                        .Select(x => x.Invitation.ExamId)
                        .ToListAsync();
                    if (!examsId.Contains(id)) exam = null;
                    break;

                default:
                    exam = null;
                    break;
            }

            var examModel = _mapper.Map<TE>(exam);
            return examModel;
        }

        public async Task CreateExamAsync(ExaminerExamModel model)
        {
            var exam = _mapper.Map<Exam>(model);
            foreach (var questionModel in model.Questions)
            {
                var question = _mapper.Map<Question>(questionModel);
                foreach (var answerModel in questionModel.Answers)
                    question.Answers.Add(_mapper.Map<Answer>(answerModel));
            }

            await _dbContext.Exams.AddAsync(exam);

            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateExamAsync(ExaminerExamModel model)
        {
            var examModel = _mapper.Map<Exam>(model);
            var loaded = await _dbContext.Exams
                .Include("Questions.Answers")
                .FirstOrDefaultAsync(x => x.ExamId == examModel.ExamId);
            if (loaded is null) throw new NotFoundException("Exam", model.ExamId);
            loaded.Name = examModel.Name;
            loaded.Questions = examModel.Questions;
            _dbContext.Entry(loaded).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteExamAsync(int id)
        {
            var exam = await _dbContext.Exams
                .FirstOrDefaultAsync(x => x.ExamId == id);

            if (exam is null) throw new NotFoundException("Exam", id);
            var invitations = _dbContext.Invitations.Where(invitation => invitation.ExamId == exam.ExamId);
            _dbContext.Invitations.RemoveRange(invitations);
            _dbContext.Exams.Remove(exam);

            await _dbContext.SaveChangesAsync();
        }
    }
}