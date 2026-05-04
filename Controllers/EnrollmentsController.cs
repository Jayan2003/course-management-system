using Microsoft.AspNetCore.Mvc;
using CourseManagementApi.Interfaces;
using CourseManagementApi.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace CourseManagementApi.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class EnrollmentsController : ControllerBase
{
    private readonly IEnrollmentService _service;

    public EnrollmentsController(IEnrollmentService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Enroll(CreateEnrollmentDto dto)
    {
        await _service.EnrollAsync(dto.StudentId, dto.CourseId);
        return Ok("Student enrolled successfully");
    }
}