
using Microsoft.EntityFrameworkCore;
using CourseManagementApi.Data;
using CourseManagementApi.Interfaces;
using CourseManagementApi.Models;

namespace CourseManagementApi.Services;

public class EnrollmentService : IEnrollmentService
{
    private readonly AppDbContext _context;

    public EnrollmentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task EnrollAsync(int studentId, int courseId)
    {
        var studentExists = await _context.Students
            .AnyAsync(s => s.Id == studentId);

        var courseExists = await _context.Courses
            .AnyAsync(c => c.Id == courseId);

        if (!studentExists || !courseExists)
            throw new Exception("Student or Course not found");

        var alreadyEnrolled = await _context.Enrollments
            .AnyAsync(e =>
                e.StudentId == studentId &&
                e.CourseId == courseId
            );

        if (alreadyEnrolled)
            throw new Exception("Student already enrolled");

        var enrollment = new Enrollment
        {
            StudentId = studentId,
            CourseId = courseId,
            EnrollDate = DateTime.UtcNow
        };

        _context.Enrollments.Add(enrollment);

        await _context.SaveChangesAsync();
    }

    public async Task<List<object>> GetStudentEnrollmentsAsync(int studentId)
    {
        return await _context.Enrollments
            .Where(e => e.StudentId == studentId)
            .Include(e => e.Course)
            .ThenInclude(c => c.Instructor)
            .Select(e => new
            {
                CourseId = e.CourseId,
                CourseTitle = e.Course.Title,
                Hours = e.Course.Hours,
                Instructor = e.Course.Instructor.Name,
                EnrollDate = e.EnrollDate,
                Grade = e.Grade
            })
            .Cast<object>()
            .ToListAsync();
    }

    public async Task<List<object>> GetInstructorStudentsAsync(int instructorId)
    {
        return await _context.Enrollments
            .Include(e => e.Student)
            .Include(e => e.Course)
            .Where(e => e.Course.InstructorId == instructorId)
            .Select(e => new
            {
                StudentId = e.StudentId,
                StudentName = e.Student.Name,
                CourseId = e.CourseId,
                CourseTitle = e.Course.Title,
                Grade = e.Grade
            })
            .Cast<object>()
            .ToListAsync();
    }

    public async Task<List<object>> GetInstructorCoursesAsync(int instructorId)
    {
        return await _context.Courses
            .Where(c => c.InstructorId == instructorId)
            .Select(c => new
            {
                c.Id,
                c.Title,
                c.Hours
            })
            .Cast<object>()
            .ToListAsync();
    }

    public async Task UpdateGradeAsync(
        int studentId,
        int courseId,
        double grade
    )
    {
        var enrollment = await _context.Enrollments
            .FirstOrDefaultAsync(e =>
                e.StudentId == studentId &&
                e.CourseId == courseId
            );

        if (enrollment == null)
            throw new Exception("Enrollment not found");

        enrollment.Grade = grade;

        await _context.SaveChangesAsync();
    }

    public async Task<int> CleanOldEnrollments()
    {
        var cutoffDate = DateTime.UtcNow.AddDays(-90);

        var oldEnrollments = await _context.Enrollments
            .Where(e => e.EnrollDate < cutoffDate)
            .ToListAsync();

        if (!oldEnrollments.Any())
            return 0;

        _context.Enrollments.RemoveRange(oldEnrollments);

        var deletedCount = await _context.SaveChangesAsync();

        Console.WriteLine(
            $"Hangfire Job: Deleted {deletedCount} old enrollments at {DateTime.UtcNow}"
        );

        return deletedCount;
    }
}