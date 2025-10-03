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
                await    leereBestellungenlöschen();
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
           await leereBestellungenlöschen();

            await _context.SaveChangesAsync();
        }
        public async Task<Bestellung?> GetBestellung(int id)
        {
            return await _context.Bestellungen
                .Include(b => b.DetailBestellungen)
                .FirstOrDefaultAsync(b => b.Id == id);
        }
        public async Task<List<Bestellung>> GetAllBestellungen()
        {
            return await _context.Bestellungen
                     .Include(b => b.DetailBestellungen)
                     .ToListAsync();
        }



        public async Task<List<DarstellungVonBestellungInWarenkorb>> GetBestellungEnCoursAsync()
        {
            return await _context!.Bestellungen
              .Include(b => b.DetailBestellungen)
              .Where(b => b.Status == "En cours")
              .Select(b => new DarstellungVonBestellungInWarenkorb
              {
                  Total = b.Total,
                  KundeId = b.KundeId,
                  DateBestellung = b.DateBestellung,
                  DetailBestellungen = b.DetailBestellungen.ToList()
              })
              //.FirstOrDefaultAsync();
              .ToListAsync();
        }

        public async Task<Bestellung?> UpdateMengeAsync(int bestellungId, int detailBestellungId, int menge)
        {
            try
            {
                var detail = await _context.DetailBestellungen
                    .FirstOrDefaultAsync(d => d.BestellungId == bestellungId && d.Id == detailBestellungId);

                if (detail == null)
                {
                    throw new InvalidOperationException($"DetailBestellung non trouvé pour BestellungId {bestellungId} et detailBestellungId {detailBestellungId}");
                }

                detail.Menge = menge;
                await _context.SaveChangesAsync();
                await   leereBestellungenlöschen();
                return await _context.Bestellungen
                    .Include(b => b.DetailBestellungen)
                    .FirstOrDefaultAsync(b => b.Id == bestellungId);
            }
            catch (Exception ex)
            {
                // Gérez l'exception, par exemple en retournant un message d'erreur
                Console.WriteLine($"Erreur lors de la mise à jour de la quantité : {ex.Message}");
                return null;
            }
        }
       public async Task<Bestellung?> DeleteItemAsync(int bestellungId, int detailBestellungId)
        {
            try
            {
                Console.WriteLine($"Suppression de l'élément avec BestellungId : {bestellungId} et DetailBestellungId : {detailBestellungId}");
                var detail = await _context.DetailBestellungen
                    .FirstOrDefaultAsync(d => d.BestellungId == bestellungId && d.Id == detailBestellungId);

                if (detail == null)
                {
                    throw new InvalidOperationException($"DetailBestellung non trouvé pour BestellungId {bestellungId} et detailBestellungId {detailBestellungId}");
                }

                var bestellung = await _context.Bestellungen
                    .Include(b => b.DetailBestellungen)
                    .FirstOrDefaultAsync(b => b.Id == bestellungId);




                if (bestellung!.DetailBestellungen.Count == 0)
                {
                    _context.Bestellungen.Remove(bestellung);
                }
                else
                {
                    bestellung.DetailBestellungen.Remove(detail);
                    _context.DetailBestellungen.Remove(detail);
                  
                }

                await _context.SaveChangesAsync();

                if (bestellung == null)
                {
                    return null; // La commande a été supprimée
                }
                return await _context.Bestellungen
                    .Include(b => b.DetailBestellungen)
                    .FirstOrDefaultAsync(b => b.Id == bestellungId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur lors de la suppression de l'élément : {ex.Message}");
                return null;
            }
        }


        public async Task leereBestellungenlöschen() {
            try
            {
                List<Bestellung> commandes = await _context.Bestellungen
                .Include(b => b.DetailBestellungen)
                .ToListAsync();
                foreach (Bestellung commande in commandes)
                {
                    if (!commande.DetailBestellungen.Any())
                    {
                        _context.Bestellungen.Remove(commande);
                    }
                }
                   await _context.SaveChangesAsync();
             }
            catch (Exception e)
            {
                Console.WriteLine($"Erreur lors de la suppression des commandes vides : {e.Message}");
            }
       }
    }
}