using Microsoft.EntityFrameworkCore.Migrations;

namespace RemoteExamination.DAL.Migrations
{
    public partial class RemoveLinkUserAnswersToCurrentDatabaseState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswer_Questions_QuestionId",
                table: "UserAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswer_Answers_SelectedAnswerId",
                table: "UserAnswer");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswer_QuestionId",
                table: "UserAnswer");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswer_SelectedAnswerId",
                table: "UserAnswer");

            migrationBuilder.DropColumn(
                name: "QuestionId",
                table: "UserAnswer");

            migrationBuilder.DropColumn(
                name: "SelectedAnswerId",
                table: "UserAnswer");

            migrationBuilder.AddColumn<bool>(
                name: "IsCorrect",
                table: "UserAnswer",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Question",
                table: "UserAnswer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SelectedAnswer",
                table: "UserAnswer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCorrect",
                table: "UserAnswer");

            migrationBuilder.DropColumn(
                name: "Question",
                table: "UserAnswer");

            migrationBuilder.DropColumn(
                name: "SelectedAnswer",
                table: "UserAnswer");

            migrationBuilder.AddColumn<int>(
                name: "QuestionId",
                table: "UserAnswer",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SelectedAnswerId",
                table: "UserAnswer",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswer_QuestionId",
                table: "UserAnswer",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswer_SelectedAnswerId",
                table: "UserAnswer",
                column: "SelectedAnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswer_Questions_QuestionId",
                table: "UserAnswer",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswer_Answers_SelectedAnswerId",
                table: "UserAnswer",
                column: "SelectedAnswerId",
                principalTable: "Answers",
                principalColumn: "AnswerId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}