
using EcommerceChatbot.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerceChatbot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DebugController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public DebugController(ApplicationDbContext db)
    {
        _db = db;
    }

    // GET: /api/Debug
    [HttpGet]
    public async Task<IActionResult> GetDebugInfo()
    {
        try
        {
            var canConnect = await _db.Database.CanConnectAsync();

            var tables = _db.Model.GetEntityTypes()
                .Select(entity => entity.GetTableName())
                .Where(name => name != null)
                .Distinct()
                .ToList();

            return Ok(new
            {
                dbStatus = canConnect,
                provider = _db.Database.ProviderName,
                tables
            });
        }
        catch (Exception)
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new { message = "Impossible de vérifier la base de données." }
            );
        }
    }
}
