using EcommerceChatbot.Models;
namespace EcommerceChatbot.Repositories;
public interface IProductRepository
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(Product product);
}