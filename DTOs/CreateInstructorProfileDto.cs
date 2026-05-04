using System.ComponentModel.DataAnnotations;

namespace CourseManagementApi.DTOs;

public class CreateInstructorProfileDto
{
    [Required]
    [MaxLength(300)]
    public string Bio { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string OfficeLocation { get; set; } = string.Empty;

    [Required]
    public int InstructorId { get; set; }
}