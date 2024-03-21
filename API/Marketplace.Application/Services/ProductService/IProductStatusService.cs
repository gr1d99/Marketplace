using Marketplace.Application.DTOs;

namespace Marketplace.Application.Services.ProductService;

public interface IProductStatusService
{
    public Task<PaginatedResponseDto<ProductStatusDto>> GetAll(ProductStatusFilterDto filter);
    public Task<ProductStatusDto?> Show(Guid productStatusId);
    public Task<ProductStatusDto> Create(ProductStatusCreateDto data);
}
