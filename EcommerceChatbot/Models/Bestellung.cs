public class Bestellung
{
    public int Id { get; set; }
    public int KundeId { get; set; }
    public DateTime DateBestellung { get; set; }= DateTime.UtcNow;
    public string Status { get; set; }= "En cours";
    public decimal Total { get; set; }
    public ICollection<DetailBestellung>? DetailBestellungen { get; set; }
}