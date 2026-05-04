using Microsoft.EntityFrameworkCore;
using CourseManagementApi.Data;
using CourseManagementApi.DTOs;
using CourseManagementApi.Interfaces;
using CourseManagementApi.Models;

namespace CourseManagementApi.Services;

public class CourseService : ICourseService
{
    private readonly AppDbContext _context;

    public CourseService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CourseResponseDto>> GetAllAsync()
    {
        return await _context.Courses
            .AsNoTracking()
            .Select(c => new CourseResponseDto
            {
                Id = c.Id,
                Title = c.Title,
                Hours = c.Hours,
                InstructorId = c.InstructorId,
                InstructorName = c.Instructor.Name
            })
            .ToListAsync();
    }

    public async Task<CourseResponseDto> GetByIdAsync(int id)
    {
        var course = await _context.Courses
            .AsNoTracking()
            .Include(c => c.Instructor)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (course == null)
            throw new Exception($"Course {id} not found");

        return new CourseResponseDto
        {
            Id = course.Id,
            Title = course.Title,
            Hours = course.Hours,
            InstructorId = course.InstructorId,
            InstructorName = course.Instructor.Name
        };
    }

    public async Task<CourseResponseDto> CreateAsync(CreateCourseDto dto)
    {
        var instructorExists = await _context.Instructors
            .AnyAsync(i => i.Id == dto.InstructorId);

        if (!instructorExists)
            throw new Exception("Instructor not found");

        var course = new Course
        {
            Title = dto.Title,
            Hours = dto.Hours,
            InstructorId = dto.InstructorId
        };

        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        return new CourseResponseDto
        {
            Id = course.Id,
            Title = course.Title,
            Hours = course.Hours
        };
    }

    public async Task<CourseResponseDto?> UpdateAsync(int id, UpdateCourseDto dto)
    {
        var course = await _context.Courses.FindAsync(id);

        if (course == null)
            return null;

        var instructorExists = await _context.Instructors
            .AnyAsync(i => i.Id == dto.InstructorId);

        if (!instructorExists)
            throw new Exception("Instructor not found");

        course.Title = dto.Title;
        course.Hours = dto.Hours;
        course.InstructorId = dto.InstructorId;

        await _context.SaveChangesAsync();

        return new CourseResponseDto
        {
            Id = course.Id,
            Title = course.Title,
            Hours = course.Hours,
            InstructorName = (await _context.Instructors
                .Where(i => i.Id == course.InstructorId)
                .Select(i => i.Name)
                .FirstAsync())
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var course = await _context.Courses.FindAsync(id);

        if (course == null)
            return false;

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();

        return true;
    }
}