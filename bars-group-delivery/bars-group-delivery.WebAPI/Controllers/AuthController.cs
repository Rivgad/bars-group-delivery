using bars_group_delivery.EntityFramework.Models;
using bars_group_delivery.WebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.RegularExpressions;

namespace bars_group_delivery.WebAPI.Controllers
{

    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        public static bool IsPhoneNumber(string number)
        {
            return Regex.Match(number, @"^([0-9]{11})$").Success;
        }

        [HttpPost]
        public async Task<IActionResult> Auth(
            [StringLength(11, MinimumLength = 11), RegularExpression(@"^([0-9]{11})$")] string phone,
            [MinLength(4)] string password)
        {
            try
            {
                var result = await _authenticationService.LoginOrRegistration(phone, password);
                if(result == null)
                {
                    return StatusCode(500);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("[Action]")]
        public async Task<IActionResult> Login([StringLength(11, MinimumLength = 11)] string phone, string password)
        {
            var token = await _authenticationService.Login(phone, password);
            
            if (token != null)
            {
                return Ok(token);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("[Action]")]
        public async Task<IActionResult> Registration([StringLength(11, MinimumLength = 11)]string phone, string password)
        {
            var result = await _authenticationService.Registration(phone, password);

            if (result.Succeeded)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }

    }
}
