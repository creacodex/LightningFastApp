using AutoMapper;
using Core.Security;
using Repository.Interface;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Hosting;
using Model;
using System;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using WebApi.Controllers.Dto;

namespace WebApi.Controllers
{
    [Route("api/v1/[controller]")]
    public class AuthenticationController : Controller
    {

        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUsersRepository _usersRepository;
        private readonly IJwtTokenHandler _jwtTokenHandler;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IEmailSender _emailSender;
        private readonly IMapper _mapper;

        public AuthenticationController(SignInManager<ApplicationUser> signInManager,
                                        UserManager<ApplicationUser> userManager,
                                        IUnitOfWork unitOfWork,
                                        IJwtTokenHandler jwtTokenHandler,
                                        IWebHostEnvironment hostingEnvironment,
                                        IEmailSender emailSender,
                                        IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _usersRepository = unitOfWork.Users;
            _jwtTokenHandler = jwtTokenHandler;
            _hostingEnvironment = hostingEnvironment;
            _emailSender = emailSender;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApplicationUser user = _mapper.Map<ApplicationUser>(registerDto);

            IdentityResult result = await _usersRepository.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (IdentityError error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }

                return BadRequest(ModelState);
            }

            string code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            string callbackUrl = $"http://localhost:4200/authentication/confirm-email?id={user.Id}&code={code}";

            await _emailSender.SendEmailAsync(
                registerDto.Email,
                "Confirm your email",
                $"Please confirm your email by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>."
                );

            return Ok();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("invite")]
        public async Task<IActionResult> Invite([FromBody] InvitationDto invitationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApplicationUser user = _mapper.Map<ApplicationUser>(invitationDto);

            IdentityResult result = await _usersRepository.CreateAsync(user, "Password123#");

            if (!result.Succeeded)
            {
                foreach (IdentityError error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }

                return BadRequest(ModelState);
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            string callbackUrl = $"http://localhost:4200/authentication/confirm-invitation?code={code}";

            await _emailSender.SendEmailAsync(
                invitationDto.Email,
                "Create your account",
                $"Please create your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

            return Ok();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return Unauthorized("Invalid login attempt.");
            }

            if (!(await _userManager.IsEmailConfirmedAsync(user)))
            {
                string code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

                string callbackUrl = $"http://localhost:4200/authentication/confirm-email?id={user.Id}&code={code}";

                await _emailSender.SendEmailAsync(
                    loginDto.Email,
                    "Confirm your email",
                    $"Please confirm your email by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>."
                    );

                return Unauthorized("Please confirm you email");
            }

            var result = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, false, false);

            if (result.Succeeded)
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var token = _jwtTokenHandler.GetToken(user.UserName, userRoles);

                var currentUser = new CurrentUserDto()
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    UserName = user.UserName,
                    Token = token.Token,
                    ValidFrom = token.ValidFrom,
                    ValidTo = token.ValidTo
                };

                return Ok(currentUser);
            }

            if (result.RequiresTwoFactor)
            {
                throw new NotImplementedException("Two Factor Authentication not implemented.");
            }

            if (result.IsLockedOut)
            {
                throw new NotImplementedException("User account locked out not implemented.");
            }
            else
            {
                return Unauthorized("Invalid login attempt.");
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);

            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                if(_hostingEnvironment.IsDevelopment())
                {
                    return BadRequest("User not found or email is not confirmed.");
                }
                // Don't reveal that the user does not exist or is not confirmed
                return Ok();
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            string callbackUrl = $"http://localhost:4200/authentication/reset-password?code={code}";

            await _emailSender.SendEmailAsync(
                forgotPasswordDto.Email,
                "Reset Password",
                $"Please reset your password by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

            return Ok();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            
            var result = await _userManager.ConfirmEmailAsync(user, code);

            if (result.Succeeded)
            {
                return Ok();
            } 
            else
            {
                return BadRequest("Error confirming your email.");
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("confirm-invitation")]
        public async Task<IActionResult> ConfirmInvitation([FromBody] ConfirmInvitationDto confirmInvitationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(confirmInvitationDto.Email);

            if (user == null)
            {
                if (_hostingEnvironment.IsDevelopment())
                {
                    return BadRequest("User not found.");
                }

                // Don't reveal that the user does not exist or is not confirmed
                return Ok();
            }

            var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(confirmInvitationDto.Code));

            var result = await _userManager.ResetPasswordAsync(user, code, confirmInvitationDto.Password);

            if (result.Succeeded)
            {
                code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                result = await _userManager.ConfirmEmailAsync(user, code);

                if (result.Succeeded)
                {
                    return Ok();
                }
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);

            if (user == null)
            {
                if (_hostingEnvironment.IsDevelopment())
                {
                    return BadRequest("User not found.");
                }

                // Don't reveal that the user does not exist or is not confirmed
                return Ok();
            }

            var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(resetPasswordDto.Code));

            var result = await _userManager.ResetPasswordAsync(user, code, resetPasswordDto.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return BadRequest(ModelState);
        }
    }
}
