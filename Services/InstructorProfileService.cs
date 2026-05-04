using Microsoft.EntityFrameworkCore;
using CourseManagementApi.Data;
using CourseManagementApi.DTOs;
using CourseManagementApi.Interfaces;
using CourseManagementApi.Models;

namespace CourseManagementApi.Services;

public class InstructorProfileService : IInstructorProfileService
{
    private readonly AppDbContext _context;

    public InstructorProfileService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<InstructorProfileResponseDto> CreateAsync(CreateInstructorProfileDto dto)
    {
        var instructorExists = await _context.Instructors
            .AnyAsync(i => i.Id == dto.InstructorId);

        if (!instructorExists)
            throw new Exception("Instructor not found");

        var alreadyHasProfile = await _context.InstructorProfiles
            .AnyAsync(p => p.InstructorId == dto.InstructorId);

        if (alreadyHasProfile)
            throw new Exception("Instructor already has profile");

        var profile = new InstructorProfile
        {
            Bio = dto.Bio,
            OfficeLocation = dto.OfficeLocation,
            InstructorId = dto.InstructorId
        };

        _context.InstructorProfiles.Add(profile);
        await _context.SaveChangesAsync();

        return new InstructorProfileResponseDto
        {
            Id = profile.Id,
            Bio = profile.Bio,
            OfficeLocation = profile.OfficeLocation,
            InstructorId = profile.InstructorId
        };
    }

    public async Task<InstructorProfileResponseDto?> GetByInstructorIdAsync(int instructorId)
    {
        return await _context.InstructorProfiles
            .AsNoTracking()
            .Where(p => p.InstructorId == instructorId)
            .Select(p => new InstructorProfileResponseDto
            {
                Id = p.Id,
                Bio = p.Bio,
                OfficeLocation = p.OfficeLocation,
                InstructorId = p.InstructorId
            })
            .FirstOrDefaultAsync();
    }
}