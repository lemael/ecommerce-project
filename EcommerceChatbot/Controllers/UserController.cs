
using EcommerceChatbot.Data;
using EcommerceChatbot.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserService _userService;


    public UsersController(ApplicationDbContext context, UserService userService)
    {
        _context = context;
        _userService = userService;
    }


    // GET api/users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    // GET api/users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    // POST api/users
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    // PUT api/users/5
    [HttpPut("{id}")]
    public async Task<ActionResult> PutUser(int id, User user)
    {
        if (id != user.Id)
        {
            return BadRequest();
        }

        _context.Entry(user).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await UserExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE api/users/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // POST api/users/login


    private async Task<bool> UserExists(int id)
    {
        return await _context.Users.AnyAsync(e => e.Id == id);
    }

    // POST api/user
    [HttpPost("/api/user")]
    public async Task<IActionResult> GetUser([FromBody] GetUserRequest request)
    {
        var user = await _userService.GetUserAsync(request.Sub);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(new { id = user.Id });
    }
    
    [HttpPost("login")]
public async Task<ActionResult> Login([FromBody]LoginModel model)
{
    // Logique de connexion ici
    var user = await _userService.GetUserAsync(model.Email, model.Password);
    if (user == null)
    {
        return Unauthorized();
    }
    // Générez un token ou une réponse de connexion réussie
    return Ok(new { token = "votre_token" });
}
}