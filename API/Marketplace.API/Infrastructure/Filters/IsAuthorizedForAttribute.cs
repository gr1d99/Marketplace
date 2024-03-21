using Marketplace.Application.DTOs;
using Marketplace.Application.Services;
using Marketplace.Domain.Entities;
using Marketplace.Infrastructure.Authorization;
using Marketplace.Infrastructure.ConfigurationOptions;
using Marketplace.Services.AuthService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using IRequestPrincipal = Marketplace.Application.Models.IRequestPrincipal;
using RequestPrincipal = Marketplace.Application.Models.RequestPrincipal;

namespace Marketplace.Infrastructure.Filters;

public class IsAuthorizedForAttribute : ActionFilterAttribute
{
    private string Resource { get; }
    private ICollection<string> Actions { get; }
    private readonly CerbosOptions _options;


    public IsAuthorizedForAttribute(IOptions<CerbosOptions> options)
    {
        _options = options.Value;
    }
    
    public IsAuthorizedForAttribute(string resource, params string[] actions)
    {
        Resource = resource;
        Actions = actions;
     }

    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var configuration = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
        var cerbosHandler = context.HttpContext.RequestServices.GetRequiredService<ICerbosHandler>();
        var _userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
        var currentUserService = context.HttpContext.RequestServices.GetRequiredService<ICurrentUserService>();

        Dictionary<string, string> metadata = new Dictionary<string, string>();

        var routeDataList = context.RouteData.Values.ToArray();

        foreach (var keyValuePair in routeDataList)
        {
            var value = keyValuePair.Value is null ? "" : keyValuePair.Value.ToString();
            if (value != null) metadata.Add(keyValuePair.Key, value);
        }

        var user = await currentUserService.GetCurrentUser();
        var userRoles = await _userService.GetUserRoles(user.Id);
        var principalRoles = userRoles.Select(role => role.Name).ToArray();
        var action = (context.RouteData.Values["action"]?.ToString() ?? "").ToLower();

        AuthorizationDto authorizationData = new AuthorizationDto()
        {
            Kind = Resource,
            Roles = principalRoles,
            Actions = new []{ action },
            RequestPrincipal = new RequestPrincipal()
            {
                Id = user.Id.ToString(),
                PolicyVersion = configuration["Cerbos:PolicyVersion"] ?? "dev"
            },
            Metadata = metadata
        };

        var isAllowed = await cerbosHandler.Handle(
            authorizationData
            );

        if (isAllowed is false)
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
            context.Result = new JsonResult(new
            {
                Message = "Not allowed!"
            });

            return;
        }

        await next();
    }
    
    private IRequestPrincipal GetRequestPrincipal(UserIdentity user)
    {
        IRequestPrincipal result = new RequestPrincipal()
        {
            Id = Convert.ToString(user.Id),
            PolicyVersion = _options.PolicyVersion
        };

        return result;
    }
}