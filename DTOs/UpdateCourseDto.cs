using System.ComponentModel.DataAnnotations;

namespace CourseManagementApi.DTOs;

public class UpdateCourseDto
{
    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty;

    [Range(1, 200)]
    public int Hours { get; set; }

    [Range(1, int.MaxValue)]
    public int InstructorId { get; set; }
}