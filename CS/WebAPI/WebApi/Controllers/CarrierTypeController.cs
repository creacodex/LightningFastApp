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
    public class CarrierTypeController : Controller
    {
        
        private readonly ICarrierTypeRepository _carrierTypeRepository;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public CarrierTypeController(IUnitOfWork unitOfWork,
                                IMapper mapper,
                                ILogger<CarrierTypeController> logger)
        {
            
            _carrierTypeRepository = unitOfWork.CarrierType;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(EntitiesResultDto<CarrierTypeDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListAsync(int page,
                                                   int pageSize,
                                                   string orderBy,
                                                   bool isAscending,
                                                   string searchField,
                                                   string searchValue)
        {
            _logger.LogTrace($"ListAsync page: {page}, pageSize: {pageSize}, orderBy: {orderBy}, isAscending: {isAscending}, searchField: {searchField}, searchValue: {searchValue}");

            EntitiesResult<CarrierType> entitiesResult = await _carrierTypeRepository.ListAsync(page, pageSize, orderBy, isAscending, searchField, searchValue);

            EntitiesResultDto<CarrierTypeDto> entitiesResultDto = _mapper.Map<EntitiesResultDto<CarrierTypeDto>>(entitiesResult);

            return Ok(entitiesResultDto);
        }

        [HttpGet]
        [ProducesResponseType(typeof(CarrierTypeDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("{id:guid}")]
        public async Task<IActionResult> FindAsync(Guid id)
        {
            _logger.LogTrace($"FindAsync id: {id}");

            CarrierType carrierType = await _carrierTypeRepository.FindAsync(id);

            if (carrierType == null)
            {
                _logger.LogTrace($"FindAsync id: {id} not found");
                return NotFound();
            }

            CarrierTypeDto carrierTypeDto = _mapper.Map<CarrierTypeDto>(carrierType);

            _logger.LogTrace($"FindAsync CarrierTypeDto: {JsonConvert.SerializeObject(carrierTypeDto)}");

            return Ok(carrierTypeDto);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddAsync([FromBody] CarrierTypeDto carrierTypeDto)
        {
            _logger.LogTrace($"AddAsync CarrierTypeDto: {JsonConvert.SerializeObject(carrierTypeDto)}");

            if (!ModelState.IsValid)
            {
                _logger.LogTrace($"AddAsync CarrierTypeDto: {JsonConvert.SerializeObject(carrierTypeDto)} bad request");
                return BadRequest(ModelState);
            }

            CarrierType carrierType = _mapper.Map<CarrierType>(carrierTypeDto);

            await _carrierTypeRepository.AddAsync(carrierType);
            await _carrierTypeRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateAsync([FromBody] CarrierTypeDto carrierTypeDto)
        {
            _logger.LogTrace($"UpdateAsync CarrierTypeDto: {JsonConvert.SerializeObject(carrierTypeDto)}");
         
            if (!ModelState.IsValid)
            {
                _logger.LogTrace($"UpdateAsync CarrierTypeDto: {JsonConvert.SerializeObject(carrierTypeDto)} bad request");
                return BadRequest(ModelState);
            }

            CarrierType carrierType = _mapper.Map<CarrierType>(carrierTypeDto);

            _carrierTypeRepository.Update(carrierType);
            await _carrierTypeRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            _logger.LogTrace($"DeleteAsync id: {id}");
            
            await _carrierTypeRepository.RemoveAsync(id);
            await _carrierTypeRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CarrierTypeDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("list")]
        public IActionResult List()
        {
            return Ok(_carrierTypeRepository.List());
        }
    }
}
