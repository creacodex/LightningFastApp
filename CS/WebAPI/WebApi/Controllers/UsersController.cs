using AutoMapper;
using Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;
using System.Threading.Tasks;
using WebApi.Controllers.Dto;


namespace WebApi.Controllers
{
    [Route("api/v1/[controller]")]
    [Authorize]
    public class UsersController : Controller
    {

        private readonly IUsersRepository _usersRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UsersController(IUnitOfWork unitOfWork,
                               UserManager<ApplicationUser> userManager,
                               IMapper mapper)
        {

            _usersRepository = unitOfWork.Users;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(EntitiesResult<ApplicationUser>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListAsync(int page,
                                           int pageSize,
                                           string orderBy,
                                           bool isAscending,
                                           string searchField,
                                           string searchValue)
        {
            EntitiesResult<ApplicationUser> entitiesResult = await _usersRepository.ListAsync(page, pageSize, orderBy, isAscending, searchField, searchValue);

            return Ok(entitiesResult);
        }

        [HttpGet]
        [ProducesResponseType(typeof(UsersDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("{id:guid}")]
        public async Task<IActionResult> FindAsync(Guid id)
        {
            ApplicationUser users = await _usersRepository.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            UsersDto usersDto = _mapper.Map<UsersDto>(users);


            return Ok(usersDto);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateAsync([FromBody] UsersDto usersDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(usersDto.Email);

            if (user == null)
            {
                return NotFound();
            }

            user.FirstName = usersDto.FirstName;
            user.LastName = usersDto.LastName;
            user.PhoneNumber = usersDto.PhoneNumber;

            IdentityResult result = await _usersRepository.UpdateAsync(user);

            if (!result.Succeeded)
            {
                foreach (IdentityError error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }

                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            IdentityResult result = await _usersRepository.RemoveAsync(id);

            if (!result.Succeeded)
            {
                foreach (IdentityError error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }

                return BadRequest(ModelState);
            }

            return Ok();
        }

    }
}
