namespace RemoteExamination.DAL.Entities
{
    public class UserInvitation
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public int InvitationId { get; set; }
        public Invitation Invitation { get; set; }
    }
}