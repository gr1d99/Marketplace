using System.Net.Mime;
using Marketplace.Application.DTOs;
using Marketplace.Application.Services;
using Marketplace.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using RegistrationCreateDto = Marketplace.Application.DTOs.RegistrationCreateDto;

namespace Marketplace.Controllers;

[ApiController]
[Route("api/[controller]")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class RegistrationsController :  ControllerBase
{
    private readonly IUserService _userService;

    public RegistrationsController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(UserIdentityDto))]
    public async Task<ActionResult<UserIdentityDto>> Create([FromBody] RegistrationCreateDto data)
    {
        var isEmailTaken = await _userService.EmailTaken(data.Email);

        if (isEmailTaken)
        {
            ModelState.AddModelError(nameof(UserIdentity.Email), "Provided email is taken!");
        }

        if (ModelState.IsValid == false)
        {
            return ValidationProblem(ModelState);
        }

        await _userService.Create(data);

        return Ok();
    }
}
