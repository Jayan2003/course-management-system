
using Microsoft.AspNetCore.Mvc;
using CourseManagementApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CourseManagementApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EnrollmentsController : ControllerBase
{
    private readonly IEnrollmentService _service;

    public EnrollmentsController(IEnrollmentService service)
    {
        _service = service;
    }

    // STUDENT ENROLLMENT
    [Authorize(Roles = "Student")]
    [HttpPost("{courseId}")]
    public async Task<IActionResult> Enroll(int courseId)
    {
        var studentIdClaim = User.FindFirst("StudentId");

        if (studentIdClaim == null)
        {
            return Unauthorized("Student ID not found in token");
        }

        var studentId = int.Parse(studentIdClaim.Value);

        await _service.EnrollAsync(studentId, courseId);

        return Ok("Student enrolled successfully");
    }

    // STUDENT VIEW ENROLLMENTS
    [Authorize(Roles = "Student")]
    [HttpGet("my")]
    public async Task<IActionResult> GetMyEnrollments()
    {
        var studentIdClaim = User.FindFirst("StudentId");

        if (studentIdClaim == null)
        {
            return Unauthorized("Student ID not found in token");
        }

        var studentId = int.Parse(studentIdClaim.Value);

        var enrollments =
            await _service.GetStudentEnrollmentsAsync(studentId);

        return Ok(enrollments);
    }

    // INSTRUCTOR VIEW STUDENTS
    [Authorize(Roles = "Instructor")]
    [HttpGet("instructor/students")]
    public async Task<IActionResult> GetInstructorStudents()
    {
        var instructorIdClaim =
            User.FindFirst("InstructorId");

        if (instructorIdClaim == null)
        {
            return Unauthorized(
                "Instructor ID not found in token"
            );
        }

        var instructorId =
            int.Parse(instructorIdClaim.Value);

        var students =
            await _service.GetInstructorStudentsAsync(
                instructorId
            );

        return Ok(students);
    }

    // INSTRUCTOR VIEW COURSES
    [Authorize(Roles = "Instructor")]
    [HttpGet("instructor/courses")]
    public async Task<IActionResult> GetInstructorCourses()
    {
        var instructorIdClaim =
            User.FindFirst("InstructorId");

        if (instructorIdClaim == null)
        {
            return Unauthorized(
                "Instructor ID not found in token"
            );
        }

        var instructorId =
            int.Parse(instructorIdClaim.Value);

        var courses =
            await _service.GetInstructorCoursesAsync(
                instructorId
            );

        return Ok(courses);
    }

    // INSTRUCTOR UPDATE GRADE
    [Authorize(Roles = "Instructor")]
    [HttpPut("grade")]
    public async Task<IActionResult> UpdateGrade(
        int studentId,
        int courseId,
        double grade
    )
    {
        await _service.UpdateGradeAsync(
            studentId,
            courseId,
            grade
        );

        return Ok("Grade updated successfully");
    }
}