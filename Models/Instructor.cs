namespace CourseManagementApi.Models;

public class Instructor
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    // One Instructor → Many Courses
    public List<Course> Courses { get; set; } = new();

    // One-to-One
    public InstructorProfile? InstructorProfile { get; set; }
}