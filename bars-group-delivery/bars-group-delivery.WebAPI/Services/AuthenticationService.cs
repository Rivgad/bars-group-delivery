using bars_group_delivery.EntityFramework.Models;
using bars_group_delivery.WebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace bars_group_delivery.WebAPI.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<Account> _userManager;
        private string _issuer;
        private string _audience;
        private string _securityKey;

        public AuthenticationService(UserManager<Account> userManager, string issuer, string audience, string securityKey)
        {
            _userManager = userManager;
            _issuer = issuer;
            _audience = audience;
            _securityKey = securityKey;
        }
        public async Task<string> GetPhoneCodeAsync(Account account,string phone)
        {
            var result = await _userManager.GenerateChangePhoneNumberTokenAsync(account, phone);

            return result;
        } 
        public async Task<bool> VerifyPhoneCodeAsync(Account account,string phone, string token)
        {
            var result = await _userManager.VerifyChangePhoneNumberTokenAsync(account, token, phone);

            return result;
        }

        public async Task<string?> LoginOrRegistration(string phone, string password)
        {
            if(phone == "11111111111")
            {
                throw new Exception();
            }
            var identityUsr = await _userManager.FindByNameAsync(phone);

            if (await _userManager.CheckPasswordAsync(identityUsr, password))
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_securityKey));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: _issuer,
                    audience: _audience,
                    signingCredentials: credentials);
                var tokenHandler = new JwtSecurityTokenHandler();
                var stringToken = tokenHandler.WriteToken(token);

                return stringToken;
            }
            else
            {
                var result = await Registration(phone, password);
                if (result.Succeeded)
                {
                    var token = await Login(phone, password);
                    return token;
                }
                else
                {
                    throw new Exception(result.ToString());
                }
            }
        }

        public async Task<string?> Login(string phone, string password)
        {
            var identityUsr = await _userManager.FindByNameAsync(phone);

            if (await _userManager.CheckPasswordAsync(identityUsr, password))
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_securityKey));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: _issuer,
                    audience: _audience,
                    signingCredentials: credentials);
                var tokenHandler = new JwtSecurityTokenHandler();
                var stringToken = tokenHandler.WriteToken(token);

                return stringToken;
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
            
            return result;
        }
    }
}
