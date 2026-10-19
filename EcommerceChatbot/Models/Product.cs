// Models/Product.cs
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceChatbot.Models;
[Table("Products", Schema = "ecommerce")]
public class Product
{
    public int Id { get; set; }  // Primary Key

    public string Name { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string Description { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public string Image { get; set; } = string.Empty;

    public int Quantity { get; set; }  // New property for stock quantity
}
