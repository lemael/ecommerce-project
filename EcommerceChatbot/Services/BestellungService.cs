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

            // ✅ Sauvegarder d'abord la commande principale SANS les détails
            var details = bestellung.DetailBestellungen?.ToList(); // Sauvegarder les détails
            bestellung.DetailBestellungen = null; // Détacher les détails de la commande

            _context.Bestellungen.Add(bestellung);
            await _context.SaveChangesAsync();

            // ✅ Maintenant ajouter les détails comme NOUVELLES entités
            if (details != null && details.Any())
            {
                foreach (var detail in details)
                {
                    // Créer un NOUVEAU détail sans ID existant
                    var newDetail = new DetailBestellung
                    {
                        BestellungId = bestellung.Id,
                        ProduktId = detail.ProduktId,
                        Menge = detail.Menge,
                        Preis = detail.Preis
                    };
                    
                    _context.DetailBestellungen.Add(newDetail);
                }
                await _context.SaveChangesAsync();
            }

            return bestellung;
        }
                public async Task AddToBestellungAsync(int produktId, int menge)
        {
            // Récupérer le produit
            var produkt = await _context.Products.FindAsync(produktId);

            // Vérifier si une commande est déjà en cours
            var bestellung = await _context.Bestellungen
                .Include(b => b.DetailBestellungen)
                .FirstOrDefaultAsync(b => b.Status == "EnCours");

            if (bestellung == null)
            {
                // Créer une nouvelle commande
                bestellung = new Bestellung
                {
                    DateBestellung = DateTime.Now,
                    Status = "EnCours",
                    DetailBestellungen = new List<DetailBestellung>()
                };
                _context.Bestellungen.Add(bestellung);
            }

            // Ajouter le détail de commande
            var detailBestellung = new DetailBestellung
            {
                ProduktId = produktId,
                BestellungId = bestellung.Id,
                Menge = menge,
                Preis = produkt!.Price,
                Bestellung = bestellung,
                Produkt = produkt
            };
            _context.DetailBestellungen.Add(detailBestellung);

            await _context.SaveChangesAsync();
        }
        public async Task<Bestellung?> GetBestellung(int id)
        {
            return await _context.Bestellungen.FindAsync(id);
        }
        public async Task<List<Bestellung>> GetAllBestellungen()
        {
            return await _context.Bestellungen.ToListAsync();
        }



        public async Task<List<DarstellungVonBestellungInWarenkorb>> GetBestellungEnCoursAsync()
        {
            return await _context!.Bestellungen
              .Where(b => b.Status == "En cours")
              .Select(b => new DarstellungVonBestellungInWarenkorb
              {
                  Total = b.Total,
                  KundeId = b.KundeId,
                  DateBestellung = b.DateBestellung
              })
              //.FirstOrDefaultAsync();
              .ToListAsync();
        }
    }
}