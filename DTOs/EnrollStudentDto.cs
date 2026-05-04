using System.ComponentModel.DataAnnotations;

namespace CourseManagementApi.DTOs;

public class EnrollStudentDto
{
    [Required]
    public int StudentId { get; set; }

    [Required]
    public int CourseId { get; set; }
}