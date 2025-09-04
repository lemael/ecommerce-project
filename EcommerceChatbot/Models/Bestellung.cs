public class Bestellung
{
    public int Id { get; set; }
    public int KundeId { get; set; }
    public DateTime DateBestellung { get; set; }
    public decimal Total { get; set; }
    public User Kunde { get; set; }
}