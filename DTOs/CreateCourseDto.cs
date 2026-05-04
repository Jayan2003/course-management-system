using System.ComponentModel.DataAnnotations;

namespace CourseManagementApi.DTOs;

public class CreateCourseDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Range(1,200)]
    public int Hours { get; set; }

    [Required]
    public int InstructorId { get; set; }
}