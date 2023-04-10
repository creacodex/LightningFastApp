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
using System.Collections.Generic;

namespace WebApi.Controllers
{
    [Route("api/v1/[controller]")]
    [Authorize]
    public class ShippingTypeController : Controller
    {
        
        private readonly IShippingTypeRepository _shippingTypeRepository;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public ShippingTypeController(IUnitOfWork unitOfWork,
                                IMapper mapper,
                                ILogger<ShippingTypeController> logger)
        {
            
            _shippingTypeRepository = unitOfWork.ShippingType;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(EntitiesResultDto<ShippingTypeDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListAsync(int page,
                                                   int pageSize,
                                                   string orderBy,
                                                   bool isAscending,
                                                   string searchField,
                                                   string searchValue)
        {
            _logger.LogTrace($"ListAsync page: {page}, pageSize: {pageSize}, orderBy: {orderBy}, isAscending: {isAscending}, searchField: {searchField}, searchValue: {searchValue}");

            EntitiesResult<ShippingType> entitiesResult = await _shippingTypeRepository.ListAsync(page, pageSize, orderBy, isAscending, searchField, searchValue);

            EntitiesResultDto<ShippingTypeDto> entitiesResultDto = _mapper.Map<EntitiesResultDto<ShippingTypeDto>>(entitiesResult);

            return Ok(entitiesResultDto);
        }

        [HttpGet]
        [ProducesResponseType(typeof(ShippingTypeDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("{id:guid}")]
        public async Task<IActionResult> FindAsync(Guid id)
        {
            _logger.LogTrace($"FindAsync id: {id}");

            ShippingType shippingType = await _shippingTypeRepository.FindAsync(id);

            if (shippingType == null)
            {
                _logger.LogTrace($"FindAsync id: {id} not found");
                return NotFound();
            }

            ShippingTypeDto shippingTypeDto = _mapper.Map<ShippingTypeDto>(shippingType);

            _logger.LogTrace($"FindAsync ShippingTypeDto: {JsonConvert.SerializeObject(shippingTypeDto)}");

            return Ok(shippingTypeDto);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddAsync([FromBody] ShippingTypeDto shippingTypeDto)
        {
            _logger.LogTrace($"AddAsync ShippingTypeDto: {JsonConvert.SerializeObject(shippingTypeDto)}");

            if (!ModelState.IsValid)
            {
                _logger.LogTrace($"AddAsync ShippingTypeDto: {JsonConvert.SerializeObject(shippingTypeDto)} bad request");
                return BadRequest(ModelState);
            }

            ShippingType shippingType = _mapper.Map<ShippingType>(shippingTypeDto);

            await _shippingTypeRepository.AddAsync(shippingType);
            await _shippingTypeRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateAsync([FromBody] ShippingTypeDto shippingTypeDto)
        {
            _logger.LogTrace($"UpdateAsync ShippingTypeDto: {JsonConvert.SerializeObject(shippingTypeDto)}");
         
            if (!ModelState.IsValid)
            {
                _logger.LogTrace($"UpdateAsync ShippingTypeDto: {JsonConvert.SerializeObject(shippingTypeDto)} bad request");
                return BadRequest(ModelState);
            }

            ShippingType shippingType = _mapper.Map<ShippingType>(shippingTypeDto);

            _shippingTypeRepository.Update(shippingType);
            await _shippingTypeRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            _logger.LogTrace($"DeleteAsync id: {id}");
            
            await _shippingTypeRepository.RemoveAsync(id);
            await _shippingTypeRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ShippingTypeDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("list")]
        public IActionResult List()
        {
            return Ok(_shippingTypeRepository.List());
        }
    }
}
