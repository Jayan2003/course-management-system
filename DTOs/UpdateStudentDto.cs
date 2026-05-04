using System.ComponentModel.DataAnnotations;

namespace CourseManagementApi.DTOs;

public class UpdateStudentDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Range(18, 60)]
    public int Age { get; set; }
}