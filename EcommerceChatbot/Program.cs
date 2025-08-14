using EcommerceChatbot.Data;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuration minimale
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// 2. Configuration essentielle
app.UseRouting();
app.MapControllers();

// 3. Gestion robuste du port
try
{
    var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
    Console.WriteLine($"Tentative de démarrage sur le port {port}");
    
    app.Run($"http://0.0.0.0:{port}");
}
catch (IOException ex) when (ex.InnerException is System.Net.Sockets.SocketException { ErrorCode: 98 })
{
    // Solution radicale pour Render
    var randomPort = new Random().Next(10001, 65535);
    Console.WriteLine($"Port occupé, basculement sur port aléatoire: {randomPort}");
    
    var newBuilder = WebApplication.CreateBuilder(args);
    newBuilder.WebHost.UseUrls($"http://0.0.0.0:{randomPort}");
    
    var newApp = newBuilder.Build();
    newApp.UseRouting();
    newApp.MapControllers();
    
    newApp.Run();
}