using Marketplace.Application.DTOs;
using Marketplace.Domain.Entities;
using Marketplace.Domain.Repositories;
using Marketplace.Infrastructure.Data;
using Marketplace.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.Application.Services.CategoryService;

public class CategoryService : ICategoryService
{
    private readonly DataContext _dataContext;
    private readonly IPaginationService _paginationService;
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(
        DataContext dataContext,
        IPaginationService paginationService,
        ICategoryRepository categoryRepository)
    {
        _dataContext = dataContext;
        _paginationService = paginationService;
        _categoryRepository = categoryRepository;
    }

    public async Task<CategoryDto?> Show(Guid categoryId)
    {
        var queryable = CategoryQueryable().AsNoTracking();

        return await queryable.Where(category => category.CategoryId == categoryId).Select(category => new CategoryDto()
        {
            Id = category.Id,
            CategoryId = category.CategoryId,
            Name = category.Name,
            Description = category.Description
        }).FirstOrDefaultAsync();
    }

    public async Task<CategoryDto> Create(CategoryCreateDto data)
    {
        var result = await _dataContext.Categories.AddAsync(new Category()
        {
            Name = data.Name,
            Description = data.Description ?? String.Empty
        });

        await _dataContext.SaveChangesAsync();

        return new CategoryDto()
        {
            Id = result.Entity.Id,
            CategoryId = result.Entity.CategoryId,
            Name = result.Entity.Name,
            Description = result.Entity.Description,
        };
    }

    public async Task Update(Guid categoryId, CategoryCreateDto data)
    {
        var category = await _categoryRepository.Get(categoryId);

        if (category is null)
        {
            throw new MarketplaceException($"Category with id = {categoryId} not found");
        }

        category.Name = data.Name;
        category.Description = data?.Description ?? "";
        
        _categoryRepository.UpdateCategory(category);

        await _dataContext.SaveChangesAsync();
    }
    
    public async Task Delete(Guid categoryId)
    {
        var category = await _categoryRepository.Get(categoryId);

        if (category is null)
        {
            throw new MarketplaceException($"Category with id = {categoryId} not found");
        }

        category.DeletedAt = DateTime.Now;
        
        _categoryRepository.UpdateCategory(category);

        await _dataContext.SaveChangesAsync();
    }

    public async Task<PaginatedResponseDto<CategoryDto>> GetAll(CategoryFilterDto query)
    {
        var queryable = CategoryQueryable()
            .AsNoTracking()
            .OrderBy(category => category.Id);;
        var total = await queryable.CountAsync();
        var paginated = await _paginationService.Paginate(queryable, query).Select(category => new CategoryDto()
        {
            Id = category.Id,
            CategoryId = category.CategoryId,
            Name = category.Name,
            Description = category.Description,
            DeletedAt = category.DeletedAt
        }).ToListAsync();
        
        return new PaginatedResponseDto<CategoryDto>()
        {
            Page = query.Page,
            Limit = query.Limit,
            Total = total,
            Results = paginated
        };
    }
    
    private IQueryable<Category> CategoryQueryable()
    {
        return _dataContext.Categories;
    }
}