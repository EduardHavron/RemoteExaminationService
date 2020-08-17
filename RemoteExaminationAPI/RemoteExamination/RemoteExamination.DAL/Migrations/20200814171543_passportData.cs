using Microsoft.EntityFrameworkCore.Migrations;

namespace RemoteExamination.DAL.Migrations
{
    public partial class passportData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                "PassportNumber",
                "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "PassportNumber",
                "AspNetUsers");
        }
    }
}