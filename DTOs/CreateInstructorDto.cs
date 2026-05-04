using System.ComponentModel.DataAnnotations;

namespace CourseManagementApi.DTOs;

public class CreateInstructorDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}