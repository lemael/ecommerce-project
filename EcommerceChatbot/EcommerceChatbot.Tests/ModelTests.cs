
using EcommerceChatbot.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace EcommerceChatbot.Tests;

public class ModelTests
{
    [Fact]
    public void Models_ShouldHaveExpectedTables()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseSqlite("Data Source=:memory:")
            .Options;

        using var context = new ApplicationDbContext(options);

        var product = context.Model
            .FindEntityType(typeof(EcommerceChatbot.Models.Product));

        var user = context.Model
            .FindEntityType(typeof(EcommerceChatbot.Models.User));

        var bestellung = context.Model
            .FindEntityType(typeof(EcommerceChatbot.Models.Bestellung));

        var detail = context.Model
            .FindEntityType(typeof(EcommerceChatbot.Models.DetailBestellung));

        var zahlung = context.Model
            .FindEntityType(typeof(EcommerceChatbot.Models.Zahlung));

        Assert.NotNull(product);
        Assert.NotNull(user);
        Assert.NotNull(bestellung);
        Assert.NotNull(detail);
        Assert.NotNull(zahlung);

        Assert.Equal("Products", product!.GetTableName());
        Assert.Equal("Users", user!.GetTableName());
        Assert.Equal("Bestellungen", bestellung!.GetTableName());
        Assert.Equal("DetailBestellungen", detail!.GetTableName());
        Assert.Equal("Zahlungen", zahlung!.GetTableName());
    }

    [Fact]
    public void Models_ShouldHavePrimaryKeys()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseSqlite("Data Source=:memory:")
            .Options;

        using var context = new ApplicationDbContext(options);

        var entityTypes = context.Model.GetEntityTypes();

        foreach (var entityType in entityTypes)
        {
            Assert.NotNull(entityType.FindPrimaryKey());
        }
    }

    [Fact]
    public void Bestellung_ShouldHaveDetailBestellungenRelationship()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseSqlite("Data Source=:memory:")
            .Options;

        using var context = new ApplicationDbContext(options);

        var detail = context.Model
            .FindEntityType(
                typeof(EcommerceChatbot.Models.DetailBestellung));

        Assert.NotNull(detail);

        var foreignKey = detail!.GetForeignKeys()
            .FirstOrDefault(fk =>
                fk.PrincipalEntityType.ClrType ==
                typeof(EcommerceChatbot.Models.Bestellung));

        Assert.NotNull(foreignKey);
        Assert.Equal(
            DeleteBehavior.Cascade,
            foreignKey!.DeleteBehavior);
    }
}
