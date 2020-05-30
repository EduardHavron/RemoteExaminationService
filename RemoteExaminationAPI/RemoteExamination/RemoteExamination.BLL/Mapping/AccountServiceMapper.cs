using RemoteExamination.BLL.Models;
using RemoteExamination.DAL.Entities;
using System;

namespace RemoteExamination.BLL.Mapping
{
    public static class AccountServiceMapper
    {
        public static User Map(UserModel model) =>
            new User
            {
                Id = string.IsNullOrEmpty(model.Id)
                    ? Guid.NewGuid().ToString()
                    : model.Id,
                UserName = model.UserName,
                Email = model.Email
            };
    }
}