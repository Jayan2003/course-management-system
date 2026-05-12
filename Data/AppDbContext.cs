
using Microsoft.EntityFrameworkCore;
using CourseManagementApi.Models;

namespace CourseManagementApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Student> Students => Set<Student>();

    public DbSet<Instructor> Instructors => Set<Instructor>();

    public DbSet<Course> Courses => Set<Course>();

    public DbSet<Enrollment> Enrollments => Set<Enrollment>();

    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Many-to-Many composite key
        modelBuilder.Entity<Enrollment>()
            .HasKey(e => new { e.StudentId, e.CourseId });

        // One User ↔ One Student
        modelBuilder.Entity<User>()
            .HasOne(u => u.Student)
            .WithOne(s => s.User)
            .HasForeignKey<User>(u => u.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // One User ↔ One Instructor
        modelBuilder.Entity<User>()
            .HasOne(u => u.Instructor)
            .WithOne(i => i.User)
            .HasForeignKey<User>(u => u.InstructorId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}