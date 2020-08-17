using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.DAL.Context
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Answer> Answers { get; set; }

        public DbSet<Exam> Exams { get; set; }

        public DbSet<ExamResult> ExamResults { get; set; }

        public DbSet<ExamResultQuestion> ExamResultQuestions { get; set; }

        public DbSet<ExamResultAnswer> ExamResultAnswers { get; set; }

        public DbSet<Invitation> Invitations { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<UserInvitation> UserInvitations { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<UserInvitation>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.UserInvitations)
                .HasForeignKey(bc => bc.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<UserInvitation>()
                .HasOne(bc => bc.Invitation)
                .WithMany(c => c.UserInvitations)
                .HasForeignKey(bc => bc.InvitationId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}