using System.ComponentModel.DataAnnotations;

namespace CourseManagementApi.DTOs;

public class UpdateInstructorDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}