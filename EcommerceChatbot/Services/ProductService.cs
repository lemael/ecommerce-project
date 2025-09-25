using System.Net.Http;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using EcommerceChatbot.Data;
using EcommerceChatbot.Models;

public class ProductService
{
    private readonly HttpClient _httpClient;
    private readonly ApplicationDbContext _db;

    public ProductService(HttpClient httpClient, ApplicationDbContext db)
    {
        _httpClient = httpClient;
        _db = db;
    }

    public async Task AddProductsFromApi()
    {
        var response = await _httpClient.GetAsync("https://fakestoreapi.com/products");
        response.EnsureSuccessStatusCode();
        var responseBody = await response.Content.ReadAsStringAsync();
        var products = JsonSerializer.Deserialize<List<ProductApiModel>>(responseBody);

        foreach (var product in products!)
        {
           if (string.IsNullOrWhiteSpace(product.title))
        {
            continue; // ou vous pouvez lancer une exception ou logger l'erreur
        }
            var productToAdd = new Product
            {
                
                Name = product.title,
                Price = (decimal)product.price,
                Description = product.description,
                Category = product.category,
                Image = product.image,
                Quantity = product.rating.count
            };

            _db.Products.Add(productToAdd);
        }

        await _db.SaveChangesAsync();
    }
}

public class ProductApiModel
{
    public int Id { get; set; }
    public string title { get; set; }
    public double price { get; set; }
    public string description { get; set; }
    public string category { get; set; }
    public string image { get; set; }
    public Rating rating { get; set; }
}

public class Rating
{
    public double rate { get; set; }
    public int count { get; set; }
}