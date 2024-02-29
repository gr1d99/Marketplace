using Marketplace.Application.DTOs;

namespace Marketplace.Application.Services;

public interface IUserService
{
    public Task<PaginatedResponseDto<UserIdentityRoleDto>> GetUserRoles(Guid userId);
    public Task<PaginatedResponseDto<UserIdentityDto>> GetAllUsers(UserIdentityFilterDto filter);
}