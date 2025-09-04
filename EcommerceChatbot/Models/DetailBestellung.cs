using EcommerceChatbot.Models;

public class DetailBestellung
{
    public int Id { get; set; }
    public int BestellungId { get; set; }
    public int ProduktId { get; set; }
    public int Menge { get; set; }
    public decimal Preis { get; set; }
    public Bestellung Bestellung { get; set; }
    public Product Produkt { get; set; }
}