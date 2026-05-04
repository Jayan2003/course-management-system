namespace CourseManagementApi.Interfaces;

public interface IEnrollmentService
{
    Task EnrollAsync(int studentId, int courseId);
    Task<int> CleanOldEnrollments();
}