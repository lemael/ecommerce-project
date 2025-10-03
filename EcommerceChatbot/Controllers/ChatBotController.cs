
using Microsoft.AspNetCore.Mvc;
using EcommerceChatbot.Models;
using EcommerceChatbot.Services;
using EcommerceChatbot.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;


[ApiController]
[Route("api/[controller]")]
public class ChatBotController : ControllerBase
{
  
    private static List<ChatExchange> _history = new List<ChatExchange>();

     private readonly OpenRouterService _openRouterService;
    //private readonly GeminiService _geminiService;
    private readonly ApplicationDbContext _db;

    public ChatBotController(OpenRouterService openRouterService, ApplicationDbContext db)
    {
        _openRouterService = openRouterService;
        _db = db;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Question))
        {
            return BadRequest("Die Frage kann nicht leer sein.");
        }
        try
        {
              // Récupérer les 5 premiers produits en base
            var products = await _db.Products.ToListAsync();

            // Construire la liste produits dans le prompt
            string productList = string.Join("\n", products.Select(p =>
               $"{p.Name}: Preis {p.Price}€, Menge {p.Quantity}"));

            // Construire le prompt complet avec les produits + question
          string prompt = $"Hier ist die Liste der Produkte:\n{productList}\nBeantworte die folgende Frage: {request.Question}";

            var result = await _openRouterService.AskGeminiAsync(prompt);
            Console.WriteLine("Réponse finale du bot : " + result);
            Console.WriteLine("liste de produits : " + productList);
            
            return Ok(new { answer = result });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet]
    public IActionResult GetHistory()
    {
        return Ok(_history);
    }
}
