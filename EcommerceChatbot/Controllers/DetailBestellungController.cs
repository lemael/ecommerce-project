using EcommerceChatbot.Services;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class DetailBestellungenController : ControllerBase
{
    private readonly DetailBestellungService _service;

    public DetailBestellungenController(DetailBestellungService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DetailBestellung>>> GetDetailBestellungen()
    {
        return Ok(await _service.GetDetailBestellungenAsync());
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<DetailBestellung>> GetDetailBestellung(int id)
    {
        return await _service.GetDetailBestellungAsync(id);
    }
}