using System.ComponentModel.DataAnnotations;

namespace RemoteExamination.API.ViewModels.AccountViewModels
{
    public class SignUpViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public bool Role { get; set; }
    }
}