using Marketplace.Application.DTOs;

namespace Marketplace.Application.Services;

public interface IPaginationService
{
    public IQueryable<T> Paginate<T>(IQueryable<T> queryable, CollectionFilterDto filter);
}
