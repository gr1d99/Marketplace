using System.ComponentModel.DataAnnotations;

namespace Marketplace.Application.DTOs;

public class VendorAddDto
{
    [Required]
    public Guid UserIdentityId { get; set; }
    [Required]
    public string Name { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
}

public class VendorDto
{
    public Guid VendorId { get; set; }
    public string Name { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
}

public class VendorFilterDto : CollectionFilterDto
{
    public VendorFilterDto()
    {
        Limit = 100;
    }
}