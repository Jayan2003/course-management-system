
using Microsoft.EntityFrameworkCore;
using CourseManagementApi.Data;
using CourseManagementApi.Interfaces;
using CourseManagementApi.DTOs;
using CourseManagementApi.Models;

namespace CourseManagementApi.Services;

public class InstructorService : IInstructorService
{
    private readonly AppDbContext _context;

    public InstructorService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<InstructorResponseDto>> GetAllAsync()
    {
        return await _context.Instructors
            .AsNoTracking()
            .Select(i => new InstructorResponseDto
            {
                Id = i.Id,
                Name = i.Name,
                Email = i.Email,
                Bio = i.Bio,
                OfficeLocation = i.OfficeLocation
            })
            .ToListAsync();
    }

    public async Task<InstructorResponseDto?> GetByIdAsync(int id)
    {
        return await _context.Instructors
            .AsNoTracking()
            .Where(i => i.Id == id)
            .Select(i => new InstructorResponseDto
            {
                Id = i.Id,
                Name = i.Name,
                Email = i.Email,
                Bio = i.Bio,
                OfficeLocation = i.OfficeLocation
            })
            .FirstOrDefaultAsync();
    }

    public async Task<InstructorResponseDto> CreateAsync(CreateInstructorDto dto)
    {
        var exists = await _context.Instructors
            .AnyAsync(i => i.Email == dto.Email);

        if (exists)
            throw new Exception("Instructor with this email already exists");

        var instructor = new Instructor
        {
            Name = dto.Name,
            Email = dto.Email,
            Bio = dto.Bio,
            OfficeLocation = dto.OfficeLocation
        };

        _context.Instructors.Add(instructor);
        await _context.SaveChangesAsync();

        return new InstructorResponseDto
        {
            Id = instructor.Id,
            Name = instructor.Name,
            Email = instructor.Email,
            Bio = instructor.Bio,
            OfficeLocation = instructor.OfficeLocation
        };
    }

    public async Task<InstructorResponseDto?> UpdateAsync(int id, UpdateInstructorDto dto)
    {
        var instructor = await _context.Instructors.FindAsync(id);

        if (instructor == null)
            return null;

        var exists = await _context.Instructors
            .AnyAsync(i => i.Email == dto.Email && i.Id != id);

        if (exists)
            throw new Exception("Instructor with this email already exists");

        instructor.Name = dto.Name;
        instructor.Email = dto.Email;
        instructor.Bio = dto.Bio;
        instructor.OfficeLocation = dto.OfficeLocation;

        await _context.SaveChangesAsync();

        return new InstructorResponseDto
        {
            Id = instructor.Id,
            Name = instructor.Name,
            Email = instructor.Email,
            Bio = instructor.Bio,
            OfficeLocation = instructor.OfficeLocation
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var instructor = await _context.Instructors.FindAsync(id);

        if (instructor == null)
            return false;

        _context.Instructors.Remove(instructor);
        await _context.SaveChangesAsync();

        return true;
    }
}