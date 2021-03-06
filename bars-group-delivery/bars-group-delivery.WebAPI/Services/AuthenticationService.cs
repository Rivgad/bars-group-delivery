using bars_group_delivery.EntityFramework;
using bars_group_delivery.EntityFramework.Models;
using bars_group_delivery.WebAPI.Contracts;
using bars_group_delivery.WebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace bars_group_delivery.WebAPI.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ApplicationContext _applicationContext;
        private readonly UserManager<Account> _userManager;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly string _securityKey;

        public AuthenticationService(
            UserManager<Account> userManager,
            ApplicationContext applicationContext,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _issuer = configuration["JWT:ValidIssuer"];
            _audience = configuration["JWT:ValidAudience"];
            _securityKey = configuration["JWT:Secret"];
            _applicationContext = applicationContext;
        }

        public async Task<AuthenticationResultDTO?> Login(string userName, string password)
        {
            var identityUsr = await _userManager.FindByNameAsync(userName);

            if (await _userManager.CheckPasswordAsync(identityUsr, password))
            {
                var userRoles = await _userManager.GetRolesAsync(identityUsr);
                var roleClaims = userRoles.Select(item => new Claim(ClaimTypes.Role, item)).ToList();

                var claims = new List<Claim> { new(ClaimTypes.MobilePhone, userName), new("UserId", identityUsr.Id) };
                claims.AddRange(roleClaims);

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_securityKey));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    claims: claims,
                    issuer: _issuer,
                    audience: _audience,
                    signingCredentials: credentials);
                var tokenHandler = new JwtSecurityTokenHandler();
                var stringToken = tokenHandler.WriteToken(token);

                var result = new AuthenticationResultDTO(
                    accessToken: stringToken,
                    phone: identityUsr.UserName,
                    name: identityUsr.Name ?? "",
                    roles: userRoles.ToArray()
                    );

                return result;
            }
            else
            {
                return null;
            }
        }

        public async Task<IdentityResult> Registration(string phone, string password)
        {
            Account user = new Account { UserName = phone };

            var result = await _userManager.CreateAsync(user, password);
            user = await _userManager.FindByNameAsync(phone);
            await _userManager.AddToRoleAsync(user, RoleConstants.User);

            return result;
        }

        public async Task<Account?> GetAccountById(string id)
        {
            var account = await _userManager.FindByIdAsync(id);

            return account;
        }

        public async Task<IdentityResult> UpdateAccount(Account account)
        {
            try
            {
                var result = await _userManager.UpdateAsync(account);
                if (result.Succeeded)
                    await _applicationContext.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
