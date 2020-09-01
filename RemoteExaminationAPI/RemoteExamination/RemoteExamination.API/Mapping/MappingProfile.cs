using AutoMapper;
using RemoteExamination.API.ViewModels.AccountViewModels;
using RemoteExamination.API.ViewModels.AdminViewModels;
using RemoteExamination.API.ViewModels.ExamCompetitionViewModels;
using RemoteExamination.API.ViewModels.ExamViewModels;
using RemoteExamination.API.ViewModels.InvitationViewModels;
using RemoteExamination.BLL.Models;
using RemoteExamination.BLL.Models.Admin;
using RemoteExamination.BLL.Models.ExamCompetition;
using RemoteExamination.BLL.Models.Invitation;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Users
            CreateMap<SignUpViewModel, UserModel>().ReverseMap();
            CreateMap<UserModel, User>().ReverseMap();
            CreateMap<SignUpAdminViewModel, UserModel>().ReverseMap();
            // Exams, Questions, Answers - API - BLL
            CreateMap<ExaminedAnswerViewModel, ExaminedAnswerModel>().ReverseMap();
            CreateMap<ExaminerAnswerViewModel, ExaminerAnswerModel>().ReverseMap();
            CreateMap<ExaminedQuestionViewModel, ExaminedQuestionModel>().ReverseMap();
            CreateMap<ExaminerQuestionViewModel, ExaminerQuestionModel>().ReverseMap();
            CreateMap<ExaminerExamViewModel, ExaminerExamModel>().ReverseMap();
            CreateMap<ExaminedExamViewModel, ExaminedExamModel>().ReverseMap();
            //Exams,Questions,Answers - BLL - DAA
            CreateMap<ExaminedAnswerModel, Answer>().ReverseMap();
            CreateMap<ExaminerAnswerModel, Answer>().ReverseMap();
            CreateMap<ExaminedQuestionModel, Question>().ReverseMap();
            CreateMap<ExaminerQuestionModel, Question>().ReverseMap();
            CreateMap<ExaminerExamModel, Exam>().ReverseMap();
            CreateMap<ExaminedExamModel, Exam>().ReverseMap();
            //Invitations
            CreateMap<InvitationViewModel, InvitationModel>().ReverseMap();
            CreateMap<InvitationModel, Invitation>().ReverseMap();
            CreateMap<ApplyInvitationViewModel, InvitationModel>().ReverseMap();
            //Exam Results

            //ExamResult
            CreateMap<ExamResultViewModel, ExamResultModel>().ReverseMap();
            CreateMap<ExamResultModel, ExamResult>().ReverseMap();
            //ExamResultQuestion
            CreateMap<ExamResultQuestionViewModel, ExamResultQuestionModel>().ReverseMap();
            CreateMap<ExamResultQuestionModel, ExamResultQuestion>().ReverseMap();
            //ExamResultAnswer
            CreateMap<ExamResultAnswerViewModel, ExamResultAnswerModel>().ReverseMap();
            CreateMap<ExamResultAnswerModel, ExamResultAnswer>().ReverseMap();
            //MapUsers
            CreateMap<AdminUserViewModel, AdminUserModel>().ReverseMap();
            CreateMap<UpdatedAdminUserViewModel, UpdatedAdminUserModel>().ReverseMap();
        }
    }
}