using bars_group_delivery.EntityFramework;
using bars_group_delivery.EntityFramework.Models;
using bars_group_delivery.WebAPI.Contracts;
using bars_group_delivery.WebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace bars_group_delivery.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<Account> _userManager;
        private readonly ApplicationContext _applicationContext;
        private readonly IAuthenticationService _authenticationService;

        public ProfileController(UserManager<Account> userManager, ApplicationContext applicationContext, IAuthenticationService authenticationService)
        {
            _userManager = userManager;
            _applicationContext = applicationContext;
            _authenticationService = authenticationService;
        }

        [Authorize(Roles = "user")]
        [HttpGet]
        public async Task<IActionResult> GetUserInfo()
        {
            string? accountId = User.FindFirst("UserId")?.Value;
            if (accountId == null)
                return StatusCode(403);

            var account = await _authenticationService.GetAccountById(accountId);

            if (account == null)
                return StatusCode(500);

            return Ok(new
            {
                phone = account.UserName,
                name = account.Name,
                addresses = account.Addresses
            });
        }

        [Authorize(Roles = "user")]
        [HttpPost]
        public async Task<IActionResult> UpdateUserInfo(ProfileUpdateDTO model)
        {
            string? accountId = User.FindFirst("UserId")?.Value;
            if (accountId == null)
                return StatusCode(403);

            var account = await _authenticationService.GetAccountById(accountId);

            account.PhoneNumber = model.Phone ?? account.PhoneNumber;
            account.Name = model.Name ?? account.Name;

            try
            {
                await _authenticationService.UpdateAccount(account);
                return AcceptedAtAction(nameof(UpdateUserInfo), new { id = account.Id, name = account.Name, phone = account.PhoneNumber });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [Authorize(Roles = "user")]
        [HttpPost("[Action]")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            string? accountId = User.FindFirst("UserId")?.Value;
            if (accountId == null)
                return StatusCode(403);

            try
            {

                _applicationContext.Addresses.Remove(new Address() { Id= id });
                await _applicationContext.SaveChangesAsync();
                return Ok(new { id });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
