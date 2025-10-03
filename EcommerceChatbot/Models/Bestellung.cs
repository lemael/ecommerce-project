public class Bestellung
{
    public int Id { get; set; }
    public int KundeId { get; set; }
    public DateTime DateBestellung { get; set; }= DateTime.UtcNow;
    public string Status { get; set; }= "En cours";
    public decimal Total 
    { 
        get 
        {
            return DetailBestellungen == null ? 0 : DetailBestellungen.Sum(db => db.Preis * db.Menge);
        } 
        // Vous pouvez supprimer le set si vous ne voulez pas que le total soit modifié directement
        set { }
    }
    public ICollection<DetailBestellung> DetailBestellungen { get; set; }= new List<DetailBestellung>();
}