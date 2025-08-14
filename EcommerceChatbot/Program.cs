using EcommerceChatbot.Data;
using EcommerceChatbot.Services;
using EcommerceChatbot.Models;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Charger variables d'environnement (.env + Render)
Env.Load();
builder.Configuration.AddEnvironmentVariables();

// Services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins("http://localhost:3000", "https://ecommerce-project-2kvd.onrender.com")
     .AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddHttpClient<OpenRouterService>();

// Connexion DB
var connStr = Environment.GetEnvironmentVariable("DefaultConnection") 
    ?? builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new Exception("Chaîne de connexion manquante");

Console.WriteLine($"Connexion DB : {new NpgsqlConnectionStringBuilder(connStr) { Password = "*****" }}");

builder.Services.AddDbContext<ApplicationDbContext>(opt => 
    opt.UseNpgsql(connStr)
       .EnableSensitiveDataLogging()
       .LogTo(Console.WriteLine, LogLevel.Information));

var app = builder.Build();

// Migrations auto
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    if (db.Database.GetPendingMigrations().Any()) db.Database.Migrate();
    if (!db.Database.CanConnect()) throw new Exception("Connexion DB échouée");
}

// Middleware
if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.UseAuthorization();

// Endpoints
app.MapControllers();
app.MapGet("/api/test", () => "API OK");
app.MapGet("/debug", async (ApplicationDbContext db) =>
    Results.Ok(new { dbStatus = await db.Database.CanConnectAsync(), 
                     tables = db.Model.GetEntityTypes().Select(e => e.GetTableName()) }));

app.MapGet("/products", async (ApplicationDbContext db) => await db.Products.ToListAsync());
app.MapPost("/add-product", async (HttpRequest req, ApplicationDbContext db) =>
{
    var f = await req.ReadFormAsync();
    var p = new Product { Name = f["name"], Price = decimal.Parse(f["price"]), Quantity = int.Parse(f["quantity"]) };
    db.Products.Add(p);
    await db.SaveChangesAsync();
    return Results.Ok("Produit ajouté !");
});

// Lancement avec port dynamique
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Run($"http://0.0.0.0:{port}");
