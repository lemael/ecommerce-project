
using EcommerceChatbot.Models;

namespace EcommerceChatbot.Services;

public interface IProductService
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(Product product);
    Task AddProductsFromApi();
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
}
