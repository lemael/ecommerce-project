public class BestellungService
{
    private readonly BestellungContext _context;

    public BestellungService(BestellungContext context)
    {
        _context = context;
    }

    public async Task<Bestellung> GetCommandeAsync(int id)
    {
        return await _context.Bestellungs.FindAsync(id);
    }

    public async Task CreateCommandeAsync(Bestellung commande)
    {
        _context.Bestellungs.Add(commande);
        await _context.SaveChangesAsync();
    }
}