using Marketplace.Application.DTOs;

namespace Marketplace.Services.Pagination;

public interface IPaginationService
{
    public IQueryable<T> Paginate<T>(IQueryable<T> queryable, CollectionFilterDto filter);
}
