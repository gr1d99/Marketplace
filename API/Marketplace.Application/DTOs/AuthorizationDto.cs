using Marketplace.Application.Models;

namespace Marketplace.Application.DTOs;

public class AuthorizationDto
{
    public string Kind { get; set; } = null!;
    public string[] Actions { get; set; } = null!;
    public string[] Roles { get; set; } = null!;
    public IRequestPrincipal RequestPrincipal { get; set; } = null!;
    public Dictionary<string, string> Metadata { get; set; } = new Dictionary<string, string>() { };
}
