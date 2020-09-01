using System.ComponentModel.DataAnnotations;

namespace RemoteExamination.API.ViewModels.AccountViewModels
{
    public class SignUpViewModel : SignUpAdminViewModel
    {
        [Required] public bool Role { get; set; }
    }
}