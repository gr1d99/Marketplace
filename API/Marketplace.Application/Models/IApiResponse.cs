namespace Marketplace.Application.Models;

public interface IApiResponse<T>
{
    bool Success { get; set; }
    T? Data { get; set; }
    string? Error { get; set; }
}