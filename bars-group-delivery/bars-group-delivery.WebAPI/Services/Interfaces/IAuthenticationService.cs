using bars_group_delivery.EntityFramework.Models;
using bars_group_delivery.WebAPI.Contracts;
using Microsoft.AspNetCore.Identity;

namespace bars_group_delivery.WebAPI.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResultDTO?> Login(string username, string password);
        Task<IdentityResult> Registration(string phone, string password);
        Task<Account?> GetAccountById(string id);
        Task UpdateAccount(Account account);
    }
}
