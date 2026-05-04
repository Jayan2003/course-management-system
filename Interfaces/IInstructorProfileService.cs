using CourseManagementApi.DTOs;

namespace CourseManagementApi.Interfaces;

public interface IInstructorProfileService
{
    Task<InstructorProfileResponseDto> CreateAsync(CreateInstructorProfileDto dto);
    Task<InstructorProfileResponseDto?> GetByInstructorIdAsync(int instructorId);
}