using EcommerceChatbot.Data;

using Microsoft.EntityFrameworkCore;


namespace EcommerceChatbot.Services
{
    public class BestellungService
    {
        private readonly ApplicationDbContext _context;

        public BestellungService(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Bestellung> CreateBestellung(Bestellung bestellung)
        {
            var user = await _context.Users.FindAsync(bestellung.KundeId);
            if (user == null)
            {
                throw new Exception("Utilisateur non trouvé");
            }

            //bestellung.Kunde = null;
            bestellung.KundeId = user.Id;

            _context.Bestellungen.Add(bestellung);
            await _context.SaveChangesAsync();

            return bestellung;
        }

        public async Task<Bestellung?> GetBestellung(int id)
        {
            return await _context.Bestellungen.FindAsync(id);
        }
        public async Task<List<Bestellung>> GetAllBestellungen()
        {
            return await _context.Bestellungen.ToListAsync();
        }
    }
}