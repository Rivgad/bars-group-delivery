using bars_group_delivery.WebAPI.Contracts;
using bars_group_delivery.WebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public async Task<IActionResult> Auth([FromBody] AuthenticationDTO authModel)
        {
            var loginResult = await _authenticationService.Login(authModel.Phone, authModel.Password);
            if (loginResult != null)
                return new JsonResult(loginResult);

            var registrationResult = await _authenticationService.Registration(authModel.Phone, authModel.Password);
            if (registrationResult.Succeeded)
            {
                loginResult = await _authenticationService.Login(authModel.Phone, authModel.Password);
                if (loginResult == null)
                    return StatusCode(500);

                return new JsonResult(loginResult);
            }
            else if (registrationResult.Errors.Any(item => item.Code == "DuplicateUserName"))
            {
                return StatusCode(403, new { error = "Login Failed, The user name or password provided is incorrect" });
            }
            else
            {
                return StatusCode(500, registrationResult.ToString());
            }
        }

    }
}
