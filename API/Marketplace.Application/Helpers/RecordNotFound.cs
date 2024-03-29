namespace Marketplace.Application.Helpers;

public static class RecordNotFound
{
    public static string Message<T>(string lookupName, string lookupKey)
    {
        return $"{typeof(T).Name} with {lookupName} = ${lookupKey} not found!";
    }
}
