using EcommerceChatbot.Models;
using System.Text.Json.Serialization;

public class DetailBestellung
{
    public int Id { get; set; }
    public int BestellungId { get; set; }
    public int ProduktId { get; set; }
    public int Menge { get; set; }
    public decimal Preis { get; set; }
    
    // Propriétés de navigation comme nullable
    [JsonIgnore]
    public Bestellung? Bestellung { get; set; }
    
    [JsonIgnore]
    public Product? Produkt { get; set; }
}