using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CourseManagementApi.DTOs;
using CourseManagementApi.Interfaces;

namespace CourseManagementApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class InstructorProfilesController : ControllerBase
{
    private readonly IInstructorProfileService _service;

    public InstructorProfilesController(IInstructorProfileService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<InstructorProfileResponseDto>> Create(CreateInstructorProfileDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return Ok(result);
    }

    [HttpGet("{instructorId}")]
    public async Task<ActionResult<InstructorProfileResponseDto>> Get(int instructorId)
    {
        var result = await _service.GetByInstructorIdAsync(instructorId);

        if (result == null)
            return NotFound();

        return Ok(result);
    }
}