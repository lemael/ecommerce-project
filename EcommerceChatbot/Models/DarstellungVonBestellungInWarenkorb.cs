public class DarstellungVonBestellungInWarenkorb
{
    public decimal? Total { get; set; }
    public int? KundeId { get; set; }
    public DateTime? DateBestellung { get; set; }
    public List<DetailBestellung> DetailBestellungen { get; set; } = new List<DetailBestellung>();
}