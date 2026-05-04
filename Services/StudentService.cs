using Microsoft.EntityFrameworkCore;
using CourseManagementApi.Data;
using CourseManagementApi.Interfaces;
using CourseManagementApi.Models;
using CourseManagementApi.DTOs;

namespace CourseManagementApi.Services;

public class StudentService : IStudentService
{
    private readonly AppDbContext _context;

    public StudentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<StudentResponseDto>> GetAllAsync()
    {
        return await _context.Students
            .AsNoTracking()
            .Select(s => new StudentResponseDto
            {
                Id = s.Id,
                Name = s.Name,
                Email = s.Email,
                Age = s.Age
            })
            .ToListAsync();
    }

    public async Task<StudentResponseDto?> GetByIdAsync(int id)
    {
        return await _context.Students
            .AsNoTracking()
            .Where(s => s.Id == id)
            .Select(s => new StudentResponseDto
            {
                Id = s.Id,
                Name = s.Name,
                Email = s.Email,
                Age = s.Age
            })
            .FirstOrDefaultAsync();
    }

    public async Task<StudentResponseDto> CreateAsync(CreateStudentDto dto)
    {
        var exists = await _context.Students
        .AnyAsync(s => s.Email == dto.Email);

        if (exists)
        {
            throw new Exception("Student with this email already exists");
        }
        var student = new Student
        {
            Name = dto.Name,
            Email = dto.Email,
            Age = dto.Age
        };

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return new StudentResponseDto
        {
            Id = student.Id,
            Name = student.Name,
            Email = student.Email
        };
    }

    public async Task<StudentResponseDto?> UpdateAsync(int id, UpdateStudentDto dto)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
            return null;
        
        var exists = await _context.Students
          .AnyAsync(s => s.Email == dto.Email && s.Id != id);

        if (exists)
          throw new Exception("Student with this email already exists");
        student.Name = dto.Name;
        student.Email = dto.Email;
        student.Age = dto.Age;

        await _context.SaveChangesAsync();

        return new StudentResponseDto
        {
            Id = student.Id,
            Name = student.Name,
            Email = student.Email
        };
    }
    public async Task<bool> DeleteAsync(int id)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
            return false;

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();

        return true;
    }
}