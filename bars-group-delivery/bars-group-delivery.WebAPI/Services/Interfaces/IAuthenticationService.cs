using Microsoft.AspNetCore.Identity;

namespace bars_group_delivery.WebAPI.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<string?> Login(string username, string password);
        Task<IdentityResult> Registration(string phone, string password);
        Task<string?> LoginOrRegistration(string phone, string password);
    }
}
