namespace Marketplace.Application.DTOs;

public class UserIdentityRoleDto
{
    public long RoleId { get; set; }
    public long UserIdentityId { get; set; }
    public string RoleName { get; set; } = String.Empty;
}