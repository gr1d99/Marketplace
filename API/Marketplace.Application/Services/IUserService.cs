using Marketplace.Application.DTOs;
using Marketplace.Domain.Entities;

namespace Marketplace.Application.Services;

public interface IUserService
{
    public Task<PaginatedResponseDto<UserIdentityRoleDto>> GetUserRoles(Guid userId);
    public Task<PaginatedResponseDto<UserIdentityDto>> GetAllUsers(UserIdentityFilterDto filter);
    public Task Create(RegistrationCreateDto data);
    public Task<bool> EmailTaken(string email);
    public Task<UserIdentityDto?> GetUser(string email);
    public Task<ICollection<Role>> GetUserRoles(long id);

}