using bars_group_delivery.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace bars_group_delivery.EntityFramework
{
    public class ApplicationProductsContextSeed
    {
        public static async Task SeedAsync(
            ApplicationContext dbContext,
            ILogger logger,
            int retry = 0)
        {
            var retryForAvailability = retry;
            try
            {
                if (dbContext.Database.IsNpgsql())
                {
                    dbContext.Database.Migrate();
                }

                if (!await dbContext.Categories.AnyAsync() &&
                    !await dbContext.Products.AnyAsync() &&
                    !await dbContext.Ingredients.AnyAsync()
                )
                {
                    await dbContext.Categories.AddRangeAsync(
                        GetPreconfiguredCateroies());

                    await dbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                if (retryForAvailability >= 10) throw;

                retryForAvailability++;

                logger.LogError(ex.Message);
                await SeedAsync(dbContext, logger, retryForAvailability);
                throw;
            }
        }
        public static IEnumerable<Category> GetPreconfiguredCateroies()
        {
            return new List<Category>()
            {
                new Category(){
                    Id=1, Title="Бургеры",
                    Products=new List<Product>()
                    {
                        new Product(){
                            Id=1, CategoryId=1, Title="Бургер делюкс", Price=800, Fats=30, Carbs=50, Proteins=20, Kcal=600, Weight=450,
                            Ingredients=new List<Ingredient>()
                            {
                                new Ingredient(){ Id=1, Title="булочка с кунжутом", ProductId=1 },
                                new Ingredient(){ Id=2, Title="соус «Цезарь»", ProductId=1 },
                                new Ingredient(){ Id=3, Title="постный сыр «Чеддер»", ProductId=1 },
                                new Ingredient(){ Id=4, Title="растительная котлета со вкусом говядины", ProductId=1 },
                                new Ingredient(){ Id=5, Title="лук", ProductId=1 },
                                new Ingredient(){ Id=6, Title="корнишоны", ProductId=1 },
                                new Ingredient(){ Id=7, Title="соус «Сальса»", ProductId=1 },
                            }
                        }
                    }
                },
                new Category(){
                    Id=2, Title="Пицца",
                    Products=new List<Product>()
                    {
                        new Product(){
                            Id=2, CategoryId=2, Title="ТОФУ РОЛЛ", Price=400, Fats=19, Carbs=88, Proteins=10, Kcal=330, Weight=450,
                            Ingredients= new List<Ingredient>()
                            {
                                new Ingredient(){ Id=8, Title="лаваш", ProductId=2 },
                                new Ingredient(){ Id=9, Title="маринованный тофу", ProductId=2 },
                                new Ingredient(){ Id=10, Title="соус «Цезарь»", ProductId=2 },
                                new Ingredient(){ Id=11, Title="руккола", ProductId=2 },
                                new Ingredient(){ Id=12, Title="шпинат", ProductId=2 },
                                new Ingredient(){ Id=13, Title="вяленые томаты", ProductId=2 },
                                new Ingredient(){ Id=14, Title="соус «Песто»", ProductId=2 },
                                new Ingredient(){ Id=15, Title="сухой чеснок", ProductId=2 },
                                new Ingredient(){ Id=16, Title="салат айсберг", ProductId=2 },
                            }
                        },
                    }
                },
                new Category(){
                    Id=3, Title="Роллы",
                    Products=new List<Product>()
                    {
                        new Product(){
                            Id=3, CategoryId=3, Title="Классический ролл с огурцом", Price=130, Fats=30, Carbs=50, Proteins=20, Kcal=123.8f, Weight=450,
                            Ingredients = new List<Ingredient>()
                            {
                                new Ingredient(){ Id=17, Title="огурец", ProductId=3 },
                                new Ingredient(){ Id=18, Title="рис", ProductId=3 },
                                new Ingredient(){ Id=19, Title="нори", ProductId=3 },
                            }
                        },
                        new Product(){
                                Id=4, CategoryId=3, Title="Классический ролл с дайконом", Price=129, Fats=1.1f, Carbs=37.6f, Proteins=3.7f, Kcal=151.6f, Weight=450,
                                Ingredients=new List<Ingredient>()
                                {
                                    new Ingredient(){ Id=20, Title="дайкон", ProductId=4 },
                                    new Ingredient(){ Id=21, Title="соус свит-чили", ProductId=4 },
                                    new Ingredient(){ Id=22, Title="рис", ProductId=4 },
                                    new Ingredient(){ Id=23, Title="нори", ProductId=4 },
                                }
                            },
                    }
                },
                new Category(){
                    Id=4, Title="Коктейли"
                }
            };
        }
    }
}
