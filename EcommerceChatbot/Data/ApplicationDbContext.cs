// Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using EcommerceChatbot.Models;

namespace EcommerceChatbot.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<Product> Products => Set<Product>();
     public DbSet<User> Users => Set<User>();
    public DbSet<Bestellung> Bestellungen => Set<Bestellung>();
    public DbSet<DetailBestellung> DetailBestellungen => Set<DetailBestellung>();
    public DbSet<Zahlung> Zahlungen => Set<Zahlung>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Products");

            entity.HasKey(p => p.Id);

            entity.Property(p => p.Name).IsRequired().HasMaxLength(255);
            entity.Property(p => p.Price).HasColumnType("decimal(10,2)");
            entity.Property(p => p.Description).HasMaxLength(2000);
            entity.Property(p => p.Category).HasMaxLength(100);
            entity.Property(p => p.Image).HasMaxLength(500);
            entity.Property(p => p.Quantity).IsRequired();
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Name).IsRequired().HasMaxLength(100);
            entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
            entity.Property(u => u.Password).IsRequired().HasMaxLength(255);
            entity.HasIndex(u => u.Email).IsUnique();
        });
modelBuilder.Entity<Bestellung>(entity =>
{
    entity.ToTable("Bestellungen");
    entity.HasKey(b => b.Id);
    entity.Property(b => b.KundeId).IsRequired();
    entity.Property(b => b.Status).IsRequired().HasMaxLength(50);
    entity.Property(b => b.DateBestellung).IsRequired();
    entity.Property(b => b.Total).HasColumnType("decimal(10,2)");

      entity.HasMany(b => b.DetailBestellungen)
          .WithOne(db => db.Bestellung)
          .HasForeignKey(db => db.BestellungId)
          .OnDelete(DeleteBehavior.Cascade);
});

modelBuilder.Entity<DetailBestellung>(entity =>
{
    entity.ToTable("DetailBestellungen");
    entity.HasKey(db => db.Id);
    entity.Property(db => db.Menge).IsRequired();
    entity.Property(db => db.Preis).HasColumnType("decimal(10,2)");
    entity.Property(db => db.BestellungId).IsRequired();
    entity.Property(db => db.ProduktId).IsRequired();

      entity.HasOne(db => db.Bestellung)
          .WithMany(b => b.DetailBestellungen)
          .HasForeignKey(db => db.BestellungId);

   entity.HasOne(db => db.Produkt)
          .WithMany()
          .HasForeignKey(db => db.ProduktId);
  

   
});
        modelBuilder.Entity<Zahlung>().HasOne(p =>
           p.Bestellung).WithMany().HasForeignKey(p => p.BestellungId);


    }
   


}
