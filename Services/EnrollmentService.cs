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
        var studentExists = await _context.Students.AnyAsync(s => s.Id == studentId);
        var courseExists = await _context.Courses.AnyAsync(c => c.Id == courseId);

        if (!studentExists || !courseExists)
            throw new Exception("Student or Course not found");

        var alreadyEnrolled = await _context.Enrollments
            .AnyAsync(e => e.StudentId == studentId && e.CourseId == courseId);

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

        Console.WriteLine($"Hangfire Job: Deleted {deletedCount} old enrollments at {DateTime.UtcNow}");

        return deletedCount;
    }
}