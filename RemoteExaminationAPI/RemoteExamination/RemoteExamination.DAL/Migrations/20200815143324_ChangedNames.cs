using Microsoft.EntityFrameworkCore.Migrations;

namespace RemoteExamination.DAL.Migrations
{
    public partial class ChangedNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "PassportNumber",
                "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                "PassportHash",
                "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                "PassportHash",
                "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                "PassportNumber",
                "AspNetUsers",
                "nvarchar(max)",
                nullable: true);
        }
    }
}