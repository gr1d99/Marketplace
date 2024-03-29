namespace Marketplace.Application.Models;

public class ApiResponse<T> : IApiResponse<T>
{
    public bool Success { get; set; } = true;
    public T? Data { get; set; }
    public string? Error { get; set; }
}
