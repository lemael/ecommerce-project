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

    [HttpPost("create-bestellung")]
    public async Task<IActionResult> CreateBestellung(Bestellung bestellung)
    {
        var createdBestellung = await _bestellungService.CreateBestellung(bestellung);
        return CreatedAtAction(nameof(GetBestellung), new { id = createdBestellung.Id }, createdBestellung);
    }
    [HttpPost("add-to-bestellung")]
    public async Task<ActionResult> AddToBestellung(int produktId, int menge)
    {
        await _bestellungService.AddToBestellungAsync(produktId, menge);
        return Ok();
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

    [HttpGet("en-cours")]
    public async Task<ActionResult<Bestellung>> GetBestellungEnCours()
    {
        var bestellung = await _bestellungService.GetBestellungEnCoursAsync();

        if (bestellung == null)
        {
            return NotFound();
        }

        return Ok(bestellung);
    }
}