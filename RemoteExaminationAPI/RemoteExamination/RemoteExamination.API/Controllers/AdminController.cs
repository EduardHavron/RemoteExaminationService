using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using RemoteExamination.API.ViewModels.AdminViewModels;
using RemoteExamination.API.ViewModels.Query;
using RemoteExamination.BLL.Abstractions;
using RemoteExamination.BLL.Models.Admin;
using RemoteExamination.Common.Authentication;

namespace RemoteExamination.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController: ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _environment;
        public AdminController(IAdminService adminService, IMapper mapper, IWebHostEnvironment environment)
        {
            _adminService = adminService;
            _mapper = mapper;
            _environment = environment;
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UpdatedAdminUserViewModel updatedAdminUserViewModel)
        {
            var user = _mapper.Map
                <UpdatedAdminUserModel>(updatedAdminUserViewModel);
            await _adminService.EditUser(user);
            return Ok();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string id)
        {
            await _adminService.RemoveUser(id);
            return Ok();
        }
        
        [Authorize(Roles = Role.Admin)]
        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _adminService.GetUsers();
            var result = users.Select(user => _mapper.Map<AdminUserViewModel>(user)).ToList();
            return Ok(result);
        }
        
        [Authorize(Roles = Role.Admin)]
        [HttpGet("GetUser/{id}")]
        public async Task<IActionResult> GetUser([FromRoute] string id)
        {
            var user = _mapper.Map<AdminUserViewModel>
                (await _adminService.GetUser(id));
            return Ok(user);
        }
        
        [Authorize(Roles = Role.Admin)]
        [HttpGet("GetBackup")] //Note that this method will not work with azure database, should use azure services for that
        public async Task<IActionResult> GetBackup()
        {
            var filePath = await _adminService.CreateBackup(_environment.WebRootPath);
            return PhysicalFile(filePath, "application/octet-stream", $"BackupFile{DateTime.UtcNow.ToShortDateString()}.bak");
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost("ExecuteQuery")]
        public async Task<IActionResult> ExecuteQuery(QueryViewModel queryViewModel)
        {
            var affectedRows = await _adminService.ExecuteQuery(queryViewModel.Query);
            return Ok(affectedRows);
        }
        
    }
}