
namespace CourseManagementApi.Models;

public class Enrollment
{
    public int StudentId { get; set; }

    public Student Student { get; set; } = null!;

    public int CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public DateTime EnrollDate { get; set; }

    // NEW
    public double? Grade { get; set; }
}