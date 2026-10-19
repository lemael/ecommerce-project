using System.ComponentModel.DataAnnotations.Schema;
namespace EcommerceChatbot.Models
{
    [Table("Users", Schema = "ecommerce")]
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}