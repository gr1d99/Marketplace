using Marketplace.Application.DTOs;

namespace Marketplace.Application.Services.CategoryService;

public interface ICategoryService
{
    public Task<CategoryDto?> Show(Guid categoryId);
    public Task<CategoryDto> Create(CategoryCreateDto data);
    public Task Update(Guid categoryId, CategoryCreateDto data);
    public Task Delete(Guid categoryId);
    public Task<PaginatedResponseDto<CategoryDto>> GetAll(CategoryFilterDto query);
}
