
namespace CourseManagementApi.Models;

public class Student
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public int Age { get; set; }

    public List<Enrollment> Enrollments { get; set; } = new();

    // One Student → One User
    public User? User { get; set; }
}