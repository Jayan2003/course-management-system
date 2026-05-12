using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CourseManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class LinkInstructorToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InstructorId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_InstructorId",
                table: "Users",
                column: "InstructorId",
                unique: true,
                filter: "[InstructorId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Instructors_InstructorId",
                table: "Users",
                column: "InstructorId",
                principalTable: "Instructors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Instructors_InstructorId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_InstructorId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "InstructorId",
                table: "Users");
        }
    }
}
