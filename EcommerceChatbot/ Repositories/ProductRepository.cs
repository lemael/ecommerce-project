using EcommerceChatbot.Data;
using EcommerceChatbot.Models;
using Microsoft.EntityFrameworkCore;
namespace EcommerceChatbot.Repositories;
public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _db;

    public ProductRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await _db.Products.ToListAsync();
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _db.Products.FindAsync(id);
    }

    public async Task AddAsync(Product product)
    {
        _db.Products.Add(product);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Product product)
    {
        if (string.IsNullOrWhiteSpace(product.Name))
        throw new ArgumentException("Le nom est obligatoire.");

        if (product.Price <= 0)
            throw new ArgumentException("Le prix doit être positif.");

        if (product.Quantity < 0)
            throw new ArgumentException("La quantité ne peut pas être négative.");

        _db.Products.Update(product);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product != null)
        {
            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
        }
    }
}