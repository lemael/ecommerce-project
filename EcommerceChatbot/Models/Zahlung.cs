
using System.ComponentModel.DataAnnotations.Schema;
namespace EcommerceChatbot.Models
{
    [Table("Zahlungen", Schema = "ecommerce")]
    public class Zahlung
    {
        public int Id { get; set; }
        public int BestellungId { get; set; }
        public DateTime DateZahlung { get; set; }
        public decimal Summe { get; set; }
        public Bestellung Bestellung { get; set; }
    }
}