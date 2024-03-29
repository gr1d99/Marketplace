using System.Linq.Expressions;
using Marketplace.Domain.Entities;

namespace Marketplace.Domain.Repositories;

public interface IVendorRepository
{ 
    Task<int> AddVendor(Vendor vendor);
    void UpdateVendor(Vendor vendor);
    Task<Vendor?> FindVendorByName(string name);
    Task<Vendor?> FindVendorById(Guid vendorId);
    Task<IQueryable<Vendor>> All();
}
