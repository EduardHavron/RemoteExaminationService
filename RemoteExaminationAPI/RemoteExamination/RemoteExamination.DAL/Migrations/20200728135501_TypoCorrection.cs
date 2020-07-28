using Microsoft.EntityFrameworkCore.Migrations;

namespace RemoteExamination.DAL.Migrations
{
    public partial class TypoCorrection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExamResultAnswers_ExamResultQuestions_ExamResultQuestionId",
                table: "ExamResultAnswers");

            migrationBuilder.DropColumn(
                name: "ExamResulQuestionId",
                table: "ExamResultAnswers");

            migrationBuilder.AlterColumn<int>(
                name: "ExamResultQuestionId",
                table: "ExamResultAnswers",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ExamResultAnswers_ExamResultQuestions_ExamResultQuestionId",
                table: "ExamResultAnswers",
                column: "ExamResultQuestionId",
                principalTable: "ExamResultQuestions",
                principalColumn: "ExamResultQuestionId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExamResultAnswers_ExamResultQuestions_ExamResultQuestionId",
                table: "ExamResultAnswers");

            migrationBuilder.AlterColumn<int>(
                name: "ExamResultQuestionId",
                table: "ExamResultAnswers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "ExamResulQuestionId",
                table: "ExamResultAnswers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_ExamResultAnswers_ExamResultQuestions_ExamResultQuestionId",
                table: "ExamResultAnswers",
                column: "ExamResultQuestionId",
                principalTable: "ExamResultQuestions",
                principalColumn: "ExamResultQuestionId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
