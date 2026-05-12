namespace CourseManagementApi.Interfaces;

public interface IEnrollmentService
{
    Task EnrollAsync(int studentId, int courseId);

    Task<List<object>> GetStudentEnrollmentsAsync(int studentId);

    Task<List<object>> GetInstructorStudentsAsync(int instructorId);

    Task<List<object>> GetInstructorCoursesAsync(int instructorId);

    Task UpdateGradeAsync(
        int studentId,
        int courseId,
        double grade
    );

    Task<int> CleanOldEnrollments();
}