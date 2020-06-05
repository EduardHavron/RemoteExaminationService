using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RemoteExamination.Common.Authentication;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.DAL.Context
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public DbSet<Answer> Answers { get; set; }

        public DbSet<Exam> Exams { get; set; }

        public DbSet<ExamResult> ExamResults { get; set; }

        public DbSet<Invitation> Invitations { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<UserAnswer> UserAnswers { get; set; }

        public DbSet<UserInvitation> UserInvitations { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserInvitation>()
                .HasKey(bc => new { bc.InvitationId, bc.UserId });

            builder.Entity<UserInvitation>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.UserInvitations)
                .HasForeignKey(bc => bc.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<UserInvitation>()
                .HasOne(bc => bc.Invitation)
                .WithMany(c => c.UserInvitations)
                .HasForeignKey(bc => bc.InvitationId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<Invitation>()
                .HasIndex(e => e.InvitationCode)
                .IsUnique();

            var adminRole = new IdentityRole
            {
                Id = Guid.NewGuid().ToString(),
                Name = Role.Admin,
                NormalizedName = Role.Admin.ToUpper()
            };
            builder.Entity<IdentityRole>().HasData(adminRole);

            var emailString = "kyrylo.stakhevych@gmail.com";
            var userAdmin = new User
            {
                Id = Guid.NewGuid().ToString(),
                UserName = emailString,
                Email = emailString,
                NormalizedEmail = emailString.ToUpper(),
                NormalizedUserName = emailString.ToUpper(),
                TwoFactorEnabled = false,
                EmailConfirmed = true,
            };
            var passwordHasher = new PasswordHasher<User>();
            userAdmin.PasswordHash = passwordHasher.HashPassword(userAdmin, "156980ABCd!");

            builder.Entity<User>().HasData(
                userAdmin
                );

            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = adminRole.Id,
                UserId = userAdmin.Id
            });
        }
    }
}