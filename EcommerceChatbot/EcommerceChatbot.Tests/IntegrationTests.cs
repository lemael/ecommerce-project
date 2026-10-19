
using System;
using System.Linq;
using System.Reflection;
using EcommerceChatbot.Data;
using EcommerceChatbot.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace EcommerceChatbot.Tests;

public class IntegrationTests
{
    private static (SqliteConnection Connection,
                    ApplicationDbContext Context) CreateTestContext()
    {
        var connection = new SqliteConnection("Data Source=:memory:");
        connection.Open();

        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseSqlite(connection)
            .Options;

        var context = new ApplicationDbContext(options);
        context.Database.EnsureCreated();

        return (connection, context);
    }

    // Remplit automatiquement les propriétés scalaires obligatoires
    // dont les noms dépendent de tes modèles.
    private static T CreateEntityWithDefaults<T>(
        ApplicationDbContext context) where T : class, new()
    {
        var entity = new T();
        var entityType = context.Model.FindEntityType(typeof(T))
            ?? throw new InvalidOperationException(
                $"Entité {typeof(T).Name} introuvable dans EF Core.");

        foreach (var property in entityType.GetProperties())
        {
            if (property.IsShadowProperty() ||
                property.IsPrimaryKey() ||
                property.PropertyInfo?.CanWrite != true)
                continue;

            var propertyInfo = property.PropertyInfo;
            var type = Nullable.GetUnderlyingType(property.ClrType)
                       ?? property.ClrType;

            object? value = null;

            if (type == typeof(string))
                value = $"integration-{property.Name}";
            else if (type == typeof(DateTime))
                value = DateTime.UtcNow;
            else if (type == typeof(decimal))
                value = 10m;
            else if (type == typeof(Guid))
                value = Guid.NewGuid();
            else if (type.IsEnum)
                value = Enum.GetValues(type).GetValue(0);
            else if (type.IsValueType)
                value = Activator.CreateInstance(type);

            if (value != null)
                propertyInfo.SetValue(entity, value);
        }

        return entity;
    }

    [Fact]
    public void Utilisateur_EnregistrementEtLecture()
    {
        var (connection, context) = CreateTestContext();

        using (connection)
        using (context)
        {
       
            var utilisateur = CreateEntityWithDefaults<User>(context);

            context.Set<User>().Add(utilisateur);
            context.SaveChanges();

            var id = context.Entry(utilisateur)
                .Property("Id").CurrentValue;

            context.ChangeTracker.Clear();

            var utilisateurLu = context.Set<User>()
                .Find(id);

            Assert.NotNull(utilisateurLu);
            Assert.Equal(id, context.Entry(utilisateurLu!)
                .Property("Id").CurrentValue);
        }
    }

    [Fact]
    public void Commande_CreationAvecSesDetails()
    {
        var (connection, context) = CreateTestContext();

        using (connection)
        using (context)
        {

            var produit = CreateEntityWithDefaults<Product>(context);
            context.Set<Product>().Add(produit);
            context.SaveChanges();

            var commande = new Bestellung
            {
                KundeId = 1,
                Status = "En cours",
                DetailBestellungen =
                {
                    new DetailBestellung
                    {
                        ProduktId = produit.Id,
                        Menge = 2,
                        Preis = 10m
                    },
                    new DetailBestellung
                    {
                        ProduktId = produit.Id,
                        Menge = 3,
                        Preis = 5m
                    }
                }
            };

            context.Set<Bestellung>().Add(commande);
            context.SaveChanges();
            var commandeId = commande.Id;

            context.ChangeTracker.Clear();

            var commandeLue = context.Set<Bestellung>()
                .Include(b => b.DetailBestellungen)
                .SingleOrDefault(b => b.Id == commandeId);

            Assert.NotNull(commandeLue);
            Assert.Equal(2, commandeLue!.DetailBestellungen.Count);
        }
    }

    [Fact]
    public void Commande_TotalCalculeCorrectement()
    {
        var commande = new Bestellung
        {
            DetailBestellungen =
            {
                new DetailBestellung { Menge = 2, Preis = 10m },
                new DetailBestellung { Menge = 3, Preis = 5m }
            }
        };

        // 2 × 10 € + 3 × 5 € = 35 €
        Assert.Equal(35m, commande.Total);
    }

    [Fact]
    public void Commande_SuppressionEnCascadeDesDetails()
    {
        var (connection, context) = CreateTestContext();

        using (connection)
        using (context)
        {

            var produit = CreateEntityWithDefaults<Product>(context);
            context.Set<Product>().Add(produit);
            context.SaveChanges();

            var commande = new Bestellung
            {
                KundeId = 1,
                DetailBestellungen =
                {
                    new DetailBestellung
                    {
                        ProduktId = produit.Id,
                        Menge = 2,
                        Preis = 10m
                    }
                }
            };

            context.Set<Bestellung>().Add(commande);
            context.SaveChanges();

            var commandeId = commande.Id;

            Assert.Equal(1, context.Set<DetailBestellung>()
                .Count(d => d.BestellungId == commandeId));

            context.Set<Bestellung>().Remove(commande);
            context.SaveChanges();

            Assert.False(context.Set<Bestellung>()
                .Any(b => b.Id == commandeId));

            Assert.False(context.Set<DetailBestellung>()
                .Any(d => d.BestellungId == commandeId));
        }
    }
}
