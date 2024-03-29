using Marketplace.Application.DTOs;
using Marketplace.Application.Models;

namespace Marketplace.Application.Services;

public interface IVendorService
{
    Task<ApiResponse<VendorDto>> AddVendor(VendorAddDto vendor);
    Task<ApiResponse<VendorDto>> UpdateVendor(Guid vendorId, VendorAddDto data);
    Task<ApiResponse<VendorDto>> GetVendor(Guid vendorId);
    Task<ApiResponse<VendorDto>> DeleteVendor(Guid vendorId);
    Task<ApiResponse<PaginatedResponseDto<VendorDto>>> AllVendors(VendorFilterDto query);
}
