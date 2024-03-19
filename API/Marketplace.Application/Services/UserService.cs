using Marketplace.Application.DTOs;
using Marketplace.Application.Enums;
using Marketplace.Domain.Entities;
using Marketplace.Domain.Repositories;
using Marketplace.Helpers;
using Marketplace.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.Application.Services;

public class UserService : IUserService
{
    private readonly DataContext _dataContext;
    private readonly IPaginationService _paginationService;
    private readonly IUserRepository _userRepository;
    
    public UserService(
        DataContext dataContext,
        IPaginationService paginationService, 
        IUserRepository userRepository)
    {
        _dataContext = dataContext;
        _paginationService = paginationService;
        _userRepository = userRepository;
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

    public async Task Create(RegistrationCreateDto data)
    {
        var user = new UserIdentity()
        {
            FirstName = data.FirstName,
            LastName = data.LastName,
            Email = data.Email,
            PasswordHash = new BCryptHelper().Hash(data.Password)
        };

        var defaultRoleId = Convert.ToInt64(RoleEnum.USER);
        var defaultRole = await _dataContext.Roles.FirstOrDefaultAsync(role => role.Id == defaultRoleId);
        var identityRole = new UserIdentityRole()
        {
            RoleId = defaultRole?.Id ?? defaultRoleId,
        };
        user.UserIdentityRoles.Add(identityRole);
        
        _userRepository.InsertUserIdentity(user);

        await _dataContext.SaveChangesAsync();
    }

    public async Task<bool> EmailTaken(string email)
    {
        var user = await _userRepository.GetUserIdentityByEmail(email).FirstOrDefaultAsync();

        if (user is null)
        {
            return false;
        }

        return true;
    }

    public async Task<UserIdentityDto> GetUser(string email)
    {
        var user = await _userRepository.GetUserIdentityByEmail(email).FirstOrDefaultAsync();

        if (user is null)
        {
            return new UserIdentityDto()
                { };
        }

        return new UserIdentityDto()
        {
            Id = user.Id,
            UserIdentityId = user.UserIdentityId,
            Email = user.Email
        };
    }

    public async Task<ICollection<Role>> GetUserRoles(long id)
    {
        // var queryable = _userRepository.GetUserIdentityById(id).Include(user => user.UserIdentityRoles);
        var queryable = _userRepository.GetUserIdentityById(id).Include(user => user.UserIdentityRoles)
            .ThenInclude(userIdentityRole => userIdentityRole.Role);
        
        var user = await queryable.FirstOrDefaultAsync();

        if (user is null)
        {
            return new List<Role>();
        }

        return user.UserIdentityRoles.Select(userIdentityRole => userIdentityRole.Role).ToList();
    }
}
