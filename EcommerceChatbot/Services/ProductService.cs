
using System.Net.Http;
using System.Text.Json;
using EcommerceChatbot.Models;
using EcommerceChatbot.Repositories;

namespace EcommerceChatbot.Services;

public class ProductService : IProductService
{
    private readonly HttpClient _httpClient;
    private readonly IProductRepository _repository;

    public ProductService(
        HttpClient httpClient,
        IProductRepository repository)
    {
        _httpClient = httpClient;
        _repository = repository;
    }

    public Task<List<Product>> GetAllAsync()
    {
        return _repository.GetAllAsync();
    }

    public Task<Product?> GetByIdAsync(int id)
    {
        return _repository.GetByIdAsync(id);
    }

    public async Task AddAsync(Product product)
    {
        if (string.IsNullOrWhiteSpace(product.Name))
            throw new ArgumentException("Le nom est obligatoire.");

        if (product.Price <= 0)
            throw new ArgumentException("Le prix doit être positif.");

        await _repository.AddAsync(product);
    }

    public async Task AddProductsFromApi()
    {
        var response = await _httpClient.GetAsync(
            "https://fakestoreapi.com/products");

        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();

        var products = JsonSerializer.Deserialize<List<ProductApiModel>>(
            responseBody,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

        if (products == null)
            throw new InvalidOperationException(
                "Impossible de lire les produits de l'API.");

        foreach (var item in products)
        {
            if (string.IsNullOrWhiteSpace(item.title))
                continue;

            var product = new Product
            {
                Name = item.title,
                Price = (decimal)item.price,
                Description = item.description ?? "",
                Category = item.category ?? "",
                Image = item.image ?? "",
                Quantity = item.rating?.count ?? 0
            };

            await _repository.AddAsync(product);
        }
    }
}

public class ProductApiModel
{
    public int Id { get; set; }
    public string title { get; set; } = "";
    public double price { get; set; }
    public string? description { get; set; }
    public string? category { get; set; }
    public string? image { get; set; }
    public Rating? rating { get; set; }
}

public class Rating
{
    public double rate { get; set; }
    public int count { get; set; }
}
