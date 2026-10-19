
using EcommerceChatbot.Models;
using EcommerceChatbot.Services;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceChatbot.Controllers;

[Route("api/products")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    // GET: /api/products
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _productService.GetAllAsync();
        return Ok(products);
    }

    // GET: /api/products/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _productService.GetByIdAsync(id);

        if (product == null)
            return NotFound();

        return Ok(product);
    }

    // GET: /api/products/import
    [HttpGet("import")]
    public async Task<IActionResult> ImportProducts()
    {
        await _productService.AddProductsFromApi();

        return Ok("Produits importés avec succès.");
    }

    // POST: /api/products
    [HttpPost]
    [Consumes("application/x-www-form-urlencoded")]
    public async Task<IActionResult> AddProduct(
        [FromForm] string name,
        [FromForm] decimal price,
        [FromForm] string description,
        [FromForm] string category,
        [FromForm] string image,
        [FromForm] int quantity)
    {
        var product = new Product
        {
            Name = name,
            Price = price,
            Description = description,
            Category = category,
            Image = image,
            Quantity = quantity
        };

        try
        {
            await _productService.AddAsync(product);
            return Ok("Produit ajouté !");
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
