namespace Marketplace.Application.Models;

public class RequestPrincipal : IRequestPrincipal
{
    public string Id { get; set; }
    public string PolicyVersion { get; set; } = String.Empty;
}
