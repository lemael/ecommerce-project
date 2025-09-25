using EcommerceChatbot.Data;
using Microsoft.EntityFrameworkCore;
using EcommerceChatbot.Models;
using System.Threading.Tasks;

namespace EcommerceChatbot.Services
{
/*  public interface IDetailBestellungService
  {
    Task<IEnumerable<DetailBestellung>> GetDetailBestellungenAsync();
    Task<DetailBestellung> GetDetailBestellungAsync(int id);
  }*/
  public class DetailBestellungService 
  {
    private readonly ApplicationDbContext _context;

    public DetailBestellungService(ApplicationDbContext context)
    {
      _context = context ?? throw new ArgumentNullException(nameof(context));;
    }

    public async Task<IEnumerable<DetailBestellung>> GetDetailBestellungenAsync()
    {  
      return await _context!.DetailBestellungen.ToListAsync();
      
    }

    public async Task<DetailBestellung> GetDetailBestellungAsync(int id)
    {

      var detailBestellung = await _context!.DetailBestellungen.FindAsync(id);
      if (detailBestellung == null)
      {
        throw new InvalidOperationException($"DetailBestellung avec l'id {id} n'existe pas.");
      }
      return detailBestellung;
    }
  }
}