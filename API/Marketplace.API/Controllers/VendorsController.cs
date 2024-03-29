using System.Net.Mime;
using System.Reflection;
using Marketplace.Application.DTOs;
using Marketplace.Application.Models;
using Marketplace.Application.Services;
using Marketplace.Infrastructure.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class VendorsController(IVendorService vendorService) : ControllerBase
{
    [HttpGet]
    [IsAuthorizedFor("vendor")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResponse<PaginatedResponseDto<VendorDto>>))]
    public async Task<ActionResult> GetAll([FromQuery] VendorFilterDto query)
    {
        var response = await vendorService.AllVendors(query);

        return Ok(response);
    }

    [HttpGet("{vendorId}")]
    [IsAuthorizedFor("vendor")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResponse<VendorDto>))]
    public async Task<ActionResult> GetOne(Guid vendorId)
    {
        var response = await vendorService.GetVendor(vendorId);

        return Ok(response);
    }

    [HttpPost]
    [IsAuthorizedFor("vendor", "create")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResponse<VendorDto>))]
    public async Task<ActionResult> Create([FromBody] VendorAddDto data)
    {
        var response = await vendorService.AddVendor(data);

        return Ok(response);
    }
    
    [HttpPut("{vendorId}")]
    [IsAuthorizedFor("vendor")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResponse<VendorDto>))]
    public async Task<ActionResult> Update(Guid vendorId, [FromBody] VendorAddDto data)
    {
        var response = await vendorService.UpdateVendor(vendorId, data);

        return Ok(response);
    }
    
    [HttpDelete("{vendorId}")]
    [IsAuthorizedFor("vendor")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResponse<VendorDto>))]
    public async Task<ActionResult> Destroy(Guid vendorId)
    {
        var response = await vendorService.DeleteVendor(vendorId);

        if (response.Success)
        {
            return NoContent();
        }

        return Ok(response);
    }
}