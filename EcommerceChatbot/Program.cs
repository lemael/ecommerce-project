using Npgsql;
using Microsoft.EntityFrameworkCore;
using EcommerceChatbot.Data;
using EcommerceChatbot.Models;
using EcommerceChatbot.Services;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            policy.WithOrigins("https://ecommerce-project-2kvd.onrender.com/")
           // policy.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<BestellungService>();
builder.Services.AddHttpClient();


// Config JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddDbContext<ApplicationDbContext>();

builder.Services.AddTransient<ProductService>();
builder.Services.AddTransient<OpenRouterService>();
builder.Services.AddHttpClient();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware pour servir les fichiers statiques (wwwroot)
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};
app.MapGet("/", async () =>
{
    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/build", "index.html");
    var html = await File.ReadAllTextAsync(filePath);
    return Results.Content(html, "text/html");
});
app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();
app.MapGet("/form", async () =>
{
    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "add-product.html");
    var html = await File.ReadAllTextAsync(filePath);
    return Results.Content(html, "text/html");
});

app.MapGet("/add-products-from-api", async (ProductService productService) =>
{
    await productService.AddProductsFromApi();
    return Results.Ok("Produits ajoutés avec succès");
});



app.MapPost("/add-product", async (HttpRequest request, ApplicationDbContext db) =>
{
  var form = await request.ReadFormAsync();
var name = form["name"];
var price = form["price"];
var description = form["description"];
var category = form["category"];
var image = form["image"];

if (!decimal.TryParse(price, out var productPrice) || productPrice <= 0)
{
    return Results.BadRequest("Prix invalide");
}

if (!int.TryParse(form["quantity"], out var quantity) || quantity <= 0)
{
    return Results.BadRequest("Quantité invalide");
}

    if (string.IsNullOrWhiteSpace(name))
    {
        return Results.BadRequest("Nom invalide");
    }
if (string.IsNullOrWhiteSpace(description))
    {
        return Results.BadRequest("Description invalide");
    }
if (string.IsNullOrWhiteSpace(category))
    {
        return Results.BadRequest("Catégorie invalide");
    }
if (string.IsNullOrWhiteSpace(image))
    {
        return Results.BadRequest("Image invalide");
    }

var product = new Product
{
    Name = name,
    Price = productPrice,
    Description = description,
    Category = category,
    Image = image,
    Quantity = quantity
};

    db.Products.Add(product);
    await db.SaveChangesAsync();

    return Results.Ok("Produit ajouté !");
});
app.MapGet("/products", async (ApplicationDbContext db) =>
{
    var products = await db.Products.ToListAsync();
    return Results.Ok(products);
});

app.MapGet("/products/{id:int}", (int id, ApplicationDbContext db) =>
{
    var product = db.Products.FirstOrDefault(p => p.Id == id);
    return product is not null ? Results.Ok(product) : Results.NotFound();
});
app.MapGet("/api/products", () => new { message = "Test réussi" });
app.MapGet("/debug", async (ApplicationDbContext db) =>
{
    try
    {
        return Results.Ok(new
        {
            dbStatus = await db.Database.CanConnectAsync(),
            tables = db.Model.GetEntityTypes().Select(e => e.GetTableName())
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.ToString());
    }
});


app.UseRouting();
app.UseCors("AllowSpecificOrigin");



app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}