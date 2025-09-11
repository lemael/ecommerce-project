using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using EcommerceChatbot.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


public class UserService
{
  private readonly ApplicationDbContext _context;
  private readonly IHttpContextAccessor _httpContextAccessor;

  public UserService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
  {
    _context = context;
    _httpContextAccessor = httpContextAccessor;
  }

  public string? GetUserId()
  {
    var user = _httpContextAccessor.HttpContext?.User;
    var userId = user?.FindFirstValue("sub");
    return userId;
  }

  public string? GetUserEmail()
  {
    var user = _httpContextAccessor.HttpContext?.User;
    var email = user?.FindFirstValue("email");
    return email;
  }
  public async Task<User?> GetUserAsync(string sub)
  {
    return await _context.Users.FirstOrDefaultAsync(u => u.Name == sub);
  }

public async Task<User> GetUserAsync(string email, string password)
{
  // Recherchez l'utilisateur par email
  var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

  if (user != null && user.Password == password)
  {
    return user;
  }

   throw new Exception("Utilisateur non trouvé ou mot de passe incorrect");
}

}