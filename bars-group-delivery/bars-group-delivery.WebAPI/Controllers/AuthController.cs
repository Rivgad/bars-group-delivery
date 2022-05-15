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


        [HttpGet("[Action]")]
        public async Task<IActionResult> Login(string username, string password)
        {
            var token = await _authenticationService.Login(username, password);
            
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
