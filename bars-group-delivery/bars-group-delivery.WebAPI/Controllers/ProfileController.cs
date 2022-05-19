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

        [Authorize(Roles = RoleConstants.User)]
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
                name = account.Name
            });
        }

        [Authorize(Roles = RoleConstants.User)]
        [HttpPost]
        public async Task<IActionResult> UpdateUserInfo(ProfileUpdateDTO model)
        {
            string? accountId = User.FindFirst("UserId")?.Value;
            if (accountId == null)
                return StatusCode(403);

            var account = await _authenticationService.GetAccountById(accountId);
            if (account == null)
                return BadRequest();

            account.UserName = string.IsNullOrEmpty(model.Phone) ? account.PhoneNumber : model.Phone.Trim();
            account.Name = string.IsNullOrEmpty(model.Name) ? account.Name : model.Name.Trim();
            account.PhoneNumber = string.IsNullOrEmpty(model.Phone) ? account.PhoneNumber : model.Phone.Trim();

            try
            {
                var result = await _authenticationService.UpdateAccount(account);
                if (result.Succeeded)
                    return AcceptedAtAction(nameof(UpdateUserInfo), new { id = account.Id, name = account.Name, phone = account.UserName });
                else
                    return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
    }
}
