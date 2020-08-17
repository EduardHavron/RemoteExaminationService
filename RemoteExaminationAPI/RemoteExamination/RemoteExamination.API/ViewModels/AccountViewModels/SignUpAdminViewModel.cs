using System.ComponentModel.DataAnnotations;

namespace RemoteExamination.API.ViewModels.AccountViewModels
{
    public class SignUpAdminViewModel
    {
        [Required] public string Email { get; set; }

        [Required] public string Password { get; set; }
    }
}