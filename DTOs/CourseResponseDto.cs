namespace CourseManagementApi.DTOs;

public class CourseResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int Hours { get; set; }
    public int InstructorId { get; set; }
    public string InstructorName { get; set; } = string.Empty;
}