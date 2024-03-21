using Cerbos.Sdk.Builder;
using Cerbos.Sdk.Utility;
using Marketplace.Application.DTOs;
using Marketplace.Application.Services.ProductService;
using Marketplace.Infrastructure.Authorization;
using Marketplace.Infrastructure.Cerbos;
using Marketplace.Infrastructure.ConfigurationOptions;
using Microsoft.Extensions.Options;

namespace Marketplace.Application.Services;

public class CerbosHandler : ICerbosHandler
{
    private readonly ICerbosProvider _cerbosProvider;
    private readonly IProductService _productService;

    public CerbosHandler(ICerbosProvider cerbosProvider, IProductService productService)
    {
        _cerbosProvider = cerbosProvider;
        _productService = productService;
    }

    public async Task<bool> Handle(AuthorizationDto data)
    {
        var client = _cerbosProvider.Client();

        var resourceAttributes = await GetAttributesFor(data);
        var request = CheckResourcesRequest.NewInstance().WithRequestId(RequestId.Generate()).WithIncludeMeta(true)
            .WithPrincipal(
                Principal.NewInstance(data.RequestPrincipal.Id, data.Roles)
                    .WithPolicyVersion(data.RequestPrincipal.PolicyVersion)
            ).WithResourceEntries(
                ResourceEntry.NewInstance(data.Kind, data.RequestPrincipal.Id)
                    .WithAttributes(resourceAttributes)
                    .WithPolicyVersion(data.RequestPrincipal.PolicyVersion)
                    .WithActions(data.Actions)
            );


        var result = client.CheckResources(request).Find(data.RequestPrincipal.Id);

        bool isAllowed = data.Actions.All(action => result.IsAllowed(action));

        if (isAllowed is false)
        {
            return false;
        }

        return true;
    }

    private async Task<Dictionary<string, AttributeValue>> GetAttributesFor(AuthorizationDto data)
    {
        switch (data.Kind)
        {
            case "product":
            {
                var metaData = data.Metadata;

                var productKeyPair = metaData.FirstOrDefault(d => d.Key == "productId");
                var productId = Guid.Parse(productKeyPair.Value);
                var product = await _productService.Show(productId);

                return new Dictionary<string, AttributeValue>()
                {
                    {
                        "CreatedById", AttributeValue.StringValue(product?.CreatedById.ToString() ?? 0.ToString())
                    }
                };
            }

            default:
            {
                return new Dictionary<string, AttributeValue>()
                    { };
            }
        }
    }
}