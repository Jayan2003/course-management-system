
namespace CourseManagementApi.Models;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Role { get; set; } = "Student";

    // Student Link
    public int? StudentId { get; set; }

    public Student? Student { get; set; }

    // Instructor Link
    public int? InstructorId { get; set; }

    public Instructor? Instructor { get; set; }
}