using Marketplace.Application.DTOs;
using Marketplace.Domain.Repositories;
using Marketplace.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.Application.Services;

public class UserService : IUserService
{
    private readonly DataContext _dataContext;
    private readonly IPaginationService _paginationService;
    
    public UserService(DataContext dataContext, IPaginationService paginationService)
    {
        _dataContext = dataContext;
        _paginationService = paginationService;
    }
    public async Task<PaginatedResponseDto<UserIdentityRoleDto>> GetUserRoles(Guid userId)
    {
        var user = await _dataContext.UserIdentities.AsNoTracking().Where(user => user.UserIdentityId == userId)
            .Include(userIdentity => userIdentity.UserIdentityRoles)
            .ThenInclude(userIdentityRole => userIdentityRole.Role).FirstOrDefaultAsync();

        if (user is null)
        {
            return new PaginatedResponseDto<UserIdentityRoleDto>();
        }

        if (!user.UserIdentityRoles.Any())
        {
            return new PaginatedResponseDto<UserIdentityRoleDto>();
        }

        var total = user.UserIdentityRoles.Count();

        return new PaginatedResponseDto<UserIdentityRoleDto>()
        {
            Limit = 100,
            Page = 1,
            Total = total,
            Results = user.UserIdentityRoles.Select(userIdentityRole => new UserIdentityRoleDto()
            {
                RoleId = userIdentityRole.RoleId,
                UserIdentityId = userIdentityRole.UserIdentityId,
                RoleName = userIdentityRole.Role.Name
            }).ToList()
        };
    }

    public async Task<PaginatedResponseDto<UserIdentityDto>> GetAllUsers(UserIdentityFilterDto filter)
    {
        var usersQueryable = _dataContext.UserIdentities.AsNoTracking().OrderBy(user => user.Id);

        var total = await usersQueryable.CountAsync();

        var paginated = await _paginationService
            .Paginate(usersQueryable, filter)
            .Select(user => new UserIdentityDto()
        {
            Id = user.Id,
            UserIdentityId = user.UserIdentityId,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt
        }).ToListAsync();
        
        return new PaginatedResponseDto<UserIdentityDto>()
        {
            Page = filter.Page,
            Limit = filter.Limit,
            Total = total,
            Results = paginated
        };
    }
}
