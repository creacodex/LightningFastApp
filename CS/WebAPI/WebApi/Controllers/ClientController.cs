using AutoMapper;
using Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Model;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using WebApi.Controllers.Dto;

namespace WebApi.Controllers
{
    [Route("api/v1/[controller]")]
    [Authorize]
    public class ClientController : Controller
    {
        
        private readonly IClientRepository _clientRepository;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public ClientController(IUnitOfWork unitOfWork,
                                IMapper mapper,
                                ILogger<ClientController> logger)
        {
            
            _clientRepository = unitOfWork.Client;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(EntitiesResultDto<ClientDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListAsync(int page,
                                                   int pageSize,
                                                   string orderBy,
                                                   bool isAscending,
                                                   string searchField,
                                                   string searchValue)
        {
            _logger.LogTrace($"ListAsync page: {page}, pageSize: {pageSize}, orderBy: {orderBy}, isAscending: {isAscending}, searchField: {searchField}, searchValue: {searchValue}");

            EntitiesResult<Client> entitiesResult = await _clientRepository.ListAsync(page, pageSize, orderBy, isAscending, searchField, searchValue);

            EntitiesResultDto<ClientDto> entitiesResultDto = _mapper.Map<EntitiesResultDto<ClientDto>>(entitiesResult);

            return Ok(entitiesResultDto);
        }

        [HttpGet]
        [ProducesResponseType(typeof(ClientDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("{id:guid}")]
        public async Task<IActionResult> FindAsync(Guid id)
        {
            _logger.LogTrace($"FindAsync id: {id}");

            Client client = await _clientRepository.FindAsync(id);

            if (client == null)
            {
                _logger.LogTrace($"FindAsync id: {id} not found");
                return NotFound();
            }

            ClientDto clientDto = _mapper.Map<ClientDto>(client);

            _logger.LogTrace($"FindAsync ClientDto: {JsonConvert.SerializeObject(clientDto)}");

            return Ok(clientDto);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddAsync([FromBody] ClientDto clientDto)
        {
            _logger.LogTrace($"AddAsync ClientDto: {JsonConvert.SerializeObject(clientDto)}");

            if (!ModelState.IsValid)
            {
                _logger.LogTrace($"AddAsync ClientDto: {JsonConvert.SerializeObject(clientDto)} bad request");
                return BadRequest(ModelState);
            }

            Client client = _mapper.Map<Client>(clientDto);

            await _clientRepository.AddAsync(client);
            await _clientRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateAsync([FromBody] ClientDto clientDto)
        {
            _logger.LogTrace($"UpdateAsync ClientDto: {JsonConvert.SerializeObject(clientDto)}");
         
            if (!ModelState.IsValid)
            {
                _logger.LogTrace($"UpdateAsync ClientDto: {JsonConvert.SerializeObject(clientDto)} bad request");
                return BadRequest(ModelState);
            }

            Client client = _mapper.Map<Client>(clientDto);

            _clientRepository.Update(client);
            await _clientRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            _logger.LogTrace($"DeleteAsync id: {id}");
            
            await _clientRepository.RemoveAsync(id);
            await _clientRepository.SaveChangesAsync();

            return Ok();
        }
    }
}
