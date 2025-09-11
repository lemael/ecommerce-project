using EcommerceChatbot.Models;
using EcommerceChatbot.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BestellungController : ControllerBase
{
    private readonly BestellungService _bestellungService;

    public BestellungController(BestellungService bestellungService)
    {
        _bestellungService = bestellungService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBestellung(Bestellung bestellung)
    {
        var createdBestellung = await _bestellungService.CreateBestellung(bestellung);
        return CreatedAtAction(nameof(GetBestellung), new { id = createdBestellung.Id }, createdBestellung);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBestellung(int id)
    {
        var bestellung = await _bestellungService.GetBestellung(id);
        if (bestellung == null)
        {
            return NotFound();
        }
        return Ok(bestellung);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllBestellungen()
    {
        var bestellungen = await _bestellungService.GetAllBestellungen();
        return Ok(bestellungen);
    }
}