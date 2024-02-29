using System.Net.Mime;
using Marketplace.Application.DTOs;
using Marketplace.Application.Services;
using Marketplace.Infrastructure.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IUserService _userServiceService;

    public UsersController(IUserService userServiceService)
    {
        _userServiceService = userServiceService;
    }
    
    [HttpGet]
    [IsAuthorizedFor("user", "read")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PaginatedResponseDto<UserIdentityDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<PaginatedResponseDto<UserIdentityDto>>> AllUsers([FromQuery] UserIdentityFilterDto query)
    {
        var result = await _userServiceService.GetAllUsers(query);

        return Ok(result);
    }
    
    [HttpGet("{userId}/roles")]
    // [Authorize]
    // [IsAuthorizedFor("user", "read")]
    // [IsAuthorizedFor("role", "read")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PaginatedResponseDto<UserIdentityDto>))]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<PaginatedResponseDto<UserIdentityRoleDto>>> UserRoles(Guid userId)
    {
        var roles = await _userServiceService.GetUserRoles(userId);

        return Ok(roles);
    }
}
