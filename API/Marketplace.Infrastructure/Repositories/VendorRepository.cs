using Marketplace.Domain.Entities;
using Marketplace.Domain.Repositories;
using Marketplace.Infrastructure.Data;
using Marketplace.Infrastructure.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Marketplace.Infrastructure.Repositories;

public class VendorRepository : Repository<Vendor>, IVendorRepository
{
    public VendorRepository(DataContext dataContext) : base(dataContext)
    {
    }

    public async Task<int> AddVendor(Vendor vendor)
    { 
        Create(vendor);
        return await _dataContext.SaveChangesAsync();
    }

    public void UpdateVendor(Vendor vendor)
    {
        Update(vendor);

        _dataContext.SaveChangesAsync();
    }

    public async Task<Vendor?> FindVendorByName(string name)
    {
        
        return await Task.FromResult(
            FindByCondition(vendor => vendor.Name.ToLower() == name.ToLower()).FirstOrDefault());
    }

    public async Task<Vendor?> FindVendorById(Guid vendorId)
    {
        return await FindByCondition(vendor => vendor.VendorId == vendorId).FirstOrDefaultAsync();
    }

    public Task<IQueryable<Vendor>> All()
    {
        return Task.FromResult(FindAll());
    }
}