namespace CourseManagementApi.Models;

public class Course
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public int Hours { get; set; }

    // Foreign Key
    public int InstructorId { get; set; }

    public Instructor Instructor { get; set; } = null!;

    // Many-to-Many
    public List<Enrollment> Enrollments { get; set; } = new();
}