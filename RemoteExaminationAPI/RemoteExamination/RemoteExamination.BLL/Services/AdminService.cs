using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models.Admin;
using RemoteExamination.DAL.Context;
using RemoteExamination.DAL.Entities;

namespace RemoteExamination.BLL.Services
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;

        public AdminService(AppDbContext dbContext,
            IMapper mapper,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<AdminUserModel> GetUser(string userId)
        {
            var fetchedUser = await _dbContext.Users
                .FirstOrDefaultAsync(u
                    => u.Id == userId);

            return new AdminUserModel
            {
                UserId = fetchedUser.Id,
                Email = fetchedUser.Email,
                Role = await GetRoles(fetchedUser)
            };
        }

        public async Task<List<AdminUserModel>> GetUsers()
        {
            var fetchedUsers = await _dbContext.Users.ToListAsync();
            var result = new List<AdminUserModel>();
            foreach (var user in fetchedUsers)
            {
                var resultedUser = new AdminUserModel
                {
                    UserId = user.Id,
                    Email = user.Email,
                    Role = await GetRoles(user)
                };
                result.Add(resultedUser);
            }

            return result;
        }

        public async Task EditUser(UpdatedAdminUserModel userModel)
        {
            var fetchedEmail = _dbContext.Users
                .FirstOrDefaultAsync(x
                    => x.Id == userModel.UserId).Result.Email;
            var fetchedUser = await _userManager.FindByEmailAsync(fetchedEmail);
            fetchedUser.Email = userModel.Email;
            await UpdateRoles(fetchedUser.Id, userModel.Role);
            if (userModel.Password != null)
            {
                await _userManager.RemovePasswordAsync(fetchedUser);
                await _userManager.AddPasswordAsync(fetchedUser, userModel.Password);
            }

            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveUser(string userId)
        {
            var contextUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (contextUser is null) throw new Exception("User not found, ensure userId is correct");
            var examResult = _dbContext.ExamResults.Where(result => result.UserId == userId);
            _dbContext.RemoveRange(examResult);
            var userInvitations = _dbContext.UserInvitations.Where(invitation => invitation.UserId == contextUser.Id);
            _dbContext.UserInvitations.RemoveRange(userInvitations);
            _dbContext.Users.Remove(contextUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<string> CreateBackup(string rootPath)
        {
            var path = Path.Combine(GetBackupPath(rootPath), "Backup.bak");
            if (File.Exists(path)) File.Delete(path);

            await _dbContext.Database.ExecuteSqlRawAsync($"Backup database [RemoteExaminationDb] to disk='{path}'");
            return path;
        }

        public async Task<int> ExecuteQuery(string query)
        {
            var affectedRows = await _dbContext.Database
                .ExecuteSqlRawAsync(query);
            return affectedRows;
        }

        private async Task<string> GetRoles(User user)
        {
            var fetchedRoles = await _userManager.GetRolesAsync(user);
            var result = fetchedRoles.Aggregate("", (current, role) => current + role);
            if (fetchedRoles is null) throw new Exception("No roles found for user, ensure that user exists");
            return result;
        }

        private async Task UpdateRoles(string userId, string role)
        {
            var employee = await _userManager.FindByIdAsync(userId);

            if (employee is null) throw new Exception("User not found");

            var roles = await _userManager.GetRolesAsync(employee);
            await _userManager.RemoveFromRolesAsync(employee, roles);

            await CheckRoleExists(role);
            await _userManager.AddToRoleAsync(employee, role);
            await _dbContext.SaveChangesAsync();
        }

        private async Task CheckRoleExists(string role)
        {
            if (!await _roleManager.RoleExistsAsync(role)) await _roleManager.CreateAsync(new IdentityRole(role));
        }

        private string GetBackupPath(string rootPath)
        {
            return Path.Combine(rootPath, "Backup");
        }
    }
}