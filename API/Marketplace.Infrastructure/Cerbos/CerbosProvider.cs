using Cerbos.Sdk;
using Cerbos.Sdk.Builder;

namespace Marketplace.Infrastructure.Cerbos;

public class CerbosProvider : ICerbosProvider
{
    public static string Target = "http://cerbos";

    private readonly CerbosClient _cerbosClient = CerbosClientBuilder.ForTarget(Target).WithPlaintext().Build();

    public CerbosClient Client()
    {
        return _cerbosClient;
    }
}
