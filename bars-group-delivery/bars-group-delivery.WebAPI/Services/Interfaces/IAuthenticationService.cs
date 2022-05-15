using Microsoft.AspNetCore.Identity;

namespace bars_group_delivery.WebAPI.Services.Interfaces
{
    public interface IAuthenticationService
    {
        public Task<string?> Login(string username, string password);
        public Task<IdentityResult> Registration(string phone, string password);
    }
}
