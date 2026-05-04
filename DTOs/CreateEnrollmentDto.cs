using System.ComponentModel.DataAnnotations;

namespace CourseManagementApi.DTOs;

public class CreateEnrollmentDto
{
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "StudentId must be greater than 0")]
    public int StudentId { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "CourseId must be greater than 0")]
    public int CourseId { get; set; }
}