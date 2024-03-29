using Marketplace.Application.DTOs;
using Marketplace.Application.Helpers;
using Marketplace.Application.Models;
using Marketplace.Domain.Entities;
using Marketplace.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.Application.Services;

public class VendorService(
    IVendorRepository vendorRepository,
    IUserRepository userRepository,
    IPaginationService paginationService) : IVendorService
{
    public async Task<ApiResponse<VendorDto>> AddVendor(VendorAddDto vendor)
    {
        var vendorExists = await VendorNameExists(vendor.Name);

        if (vendorExists)
        {
            return new ApiResponse<VendorDto>()
            {
                Success = false,
                Error = "vendor already exists!"
            };
        }

        var user = userRepository.GetUserIdentityById(vendor.UserIdentityId).FirstOrDefault();

        if (user is null)
        {
            return new ApiResponse<VendorDto>()
            {
                Success = false,
                Error = "vendor user does not exist!"
            };
        }

        var entity = new Vendor()
        {
            UserIdentityId = user.Id,
            Name = vendor.Name,
            Description = vendor.Description
        };

        try
        {
            await vendorRepository.AddVendor(entity);
            return new ApiResponse<VendorDto>()
            {
                Data = new VendorDto()
                {
                    Name = vendor.Name,
                    Description = vendor.Description
                }
            };
        }
        catch (Exception e)
        {
            return new ApiResponse<VendorDto>()
            {
                Success = false,
                Error = e.Message
            };
        }
    }

    public async Task<ApiResponse<VendorDto>> UpdateVendor(Guid vendorId, VendorAddDto data)
    {
        var vendor = await vendorRepository.FindVendorById(vendorId);

        if (vendor is null)
        {
            return new ApiResponse<VendorDto>()
            {
                Success = false,
                Error = RecordNotFound.Message<Vendor>(nameof(vendorId), vendorId.ToString())
            };
        }

        vendor.Name = data.Name;
        vendor.Description = data.Description;

        vendorRepository.UpdateVendor(vendor);

        return new ApiResponse<VendorDto>()
        {
            Data = new VendorDto()
            {
                VendorId = vendor.VendorId,
                Name = vendor.Name,
                Description = vendor.Description
            }
        };
    }

    public async Task<ApiResponse<VendorDto>> GetVendor(Guid vendorId)
    {
        var vendor = await vendorRepository.FindVendorById(vendorId);

        if (vendor is null)
        {
            return new ApiResponse<VendorDto>()
            {
                Success = false,
                Data = new VendorDto(),
                Error = RecordNotFound.Message<Vendor>(nameof(vendorId), vendorId.ToString())
            };
        }

        return new ApiResponse<VendorDto>()
        {
            Data = new VendorDto()
            {
                VendorId = vendor.VendorId,
                Name = vendor.Name,
                Description = vendor.Description
            }
        };
    }

    public async Task<ApiResponse<VendorDto>> DeleteVendor(Guid vendorId)
    {
        var vendor = await vendorRepository.FindVendorById(vendorId);
        
        if (vendor is null)
        {
            return new ApiResponse<VendorDto>()
            {
                Success = false,
                Data = new VendorDto(),
                Error = RecordNotFound.Message<Vendor>(nameof(vendorId), vendorId.ToString())
            };
        }
        
        vendor.DeletedAt = DateTime.UtcNow;
        
        vendorRepository.UpdateVendor(vendor);

        return new ApiResponse<VendorDto>()
            { };
    }

    public async Task<ApiResponse<PaginatedResponseDto<VendorDto>>> AllVendors(VendorFilterDto query)
    {
        var queryable = await vendorRepository.All();
        var total = await queryable.CountAsync();
        var results = await paginationService.Paginate(queryable, query).ToListAsync();
        var vendors = results.Select(vendor => new VendorDto()
        {
            VendorId = vendor.VendorId,
            Name = vendor.Name,
            Description = vendor.Description,
        }).ToList();

        return new ApiResponse<PaginatedResponseDto<VendorDto>>()
        {
            Data = new PaginatedResponseDto<VendorDto>()
            {
                Page = query.Page,
                Limit = query.Limit,
                Total = total,
                Results = vendors
            }
        };
    }

    private async Task<bool> VendorNameExists(string name)
    {
        var vendor = await vendorRepository.FindVendorByName(name);

        return vendor is not null;
    }
}