using System.Net.Mime;
using Marketplace.Application.DTOs;
using Marketplace.Application.Services.CategoryService;
using Marketplace.Infrastructure.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    private readonly ILogger<CategoriesController> _logger;

    public CategoriesController(ICategoryService categoryService, ILogger<CategoriesController> logger)
    {
        _categoryService = categoryService;
        _logger = logger;
    }

    [HttpGet]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PaginatedResponseDto<CategoryDto>))]
    public async Task<ActionResult<PaginatedResponseDto<CategoryDto>>> GetAll([FromQuery] CategoryFilterDto query)
    {
        var result = await _categoryService.GetAll(query);
        return Ok(result);
    }

    [HttpGet("{categoryId}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CategoryDto))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(string))]
    [Consumes(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<CategoryDto>> Show(Guid categoryId)
    {
        var category = await _categoryService.Show(categoryId);

        if (category is null)
        {
            return NotFound($"Category with id = {categoryId} not found");
        }

        return Ok(category);
    }

    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Consumes(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<CategoryDto>> Create([FromBody] CategoryCreateDto data)
    {
        var result = await _categoryService.Create(data);
        
        return CreatedAtAction(nameof(Show), new { categoryId = result.CategoryId }, result);
    }

    [Authorize]
    [HttpPut("{categoryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Consumes(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<CategoryDto>> Update(Guid categoryId, [FromBody] CategoryCreateDto data)
    {
        try
        {
            await _categoryService.Update(categoryId, data);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [Authorize]
    [IsAuthorizedFor("category")]
    [HttpDelete("{categoryId}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Consumes(MediaTypeNames.Application.Json)]
    public async Task<ActionResult<CategoryDto>> Destroy(Guid categoryId)
    {
        try
        {
            await _categoryService.Delete(categoryId);
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}