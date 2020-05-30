using Microsoft.EntityFrameworkCore.Migrations;

namespace RemoteExamination.DAL.Migrations
{
    public partial class KeyFieldFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswer_ExamResults_ExamResultId",
                table: "UserAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswer_ExamResults_ExamResultId1",
                table: "UserAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswer_AspNetUsers_UserId1",
                table: "UserAnswer");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswer_ExamResultId1",
                table: "UserAnswer");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswer_UserId1",
                table: "UserAnswer");

            migrationBuilder.DropColumn(
                name: "ExamResultId1",
                table: "UserAnswer");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "UserAnswer");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswer_ExamResults_ExamResultId",
                table: "UserAnswer",
                column: "ExamResultId",
                principalTable: "ExamResults",
                principalColumn: "ExamResultId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswer_ExamResults_ExamResultId",
                table: "UserAnswer");

            migrationBuilder.AddColumn<int>(
                name: "ExamResultId1",
                table: "UserAnswer",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "UserAnswer",
                type: "nvarchar(36)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswer_ExamResultId1",
                table: "UserAnswer",
                column: "ExamResultId1");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswer_UserId1",
                table: "UserAnswer",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswer_ExamResults_ExamResultId",
                table: "UserAnswer",
                column: "ExamResultId",
                principalTable: "ExamResults",
                principalColumn: "ExamResultId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswer_ExamResults_ExamResultId1",
                table: "UserAnswer",
                column: "ExamResultId1",
                principalTable: "ExamResults",
                principalColumn: "ExamResultId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswer_AspNetUsers_UserId1",
                table: "UserAnswer",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}