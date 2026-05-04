using Microsoft.AspNetCore.Mvc;
using CourseManagementApi.Interfaces;
using CourseManagementApi.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace CourseManagementApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _service;

    public StudentsController(IStudentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<StudentResponseDto>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<StudentResponseDto>> GetById(int id)
    {
        var student = await _service.GetByIdAsync(id);

        if (student == null)
            return NotFound();

        return Ok(student);
    }
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<StudentResponseDto>> Create(CreateStudentDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return Ok(created);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateStudentDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);

        if (updated == null)
            return NotFound();

        return Ok(updated);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}