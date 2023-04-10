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
    public class DeliveryController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryRepository _deliveryRepository;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public DeliveryController(IUnitOfWork unitOfWork,
                                IMapper mapper,
                                ILogger<DeliveryController> logger)
        {
            _unitOfWork = unitOfWork;
            _deliveryRepository = unitOfWork.Delivery;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(EntitiesResultDto<DeliveryDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListAsync(int page,
                                                   int pageSize,
                                                   string orderBy,
                                                   bool isAscending,
                                                   string searchField,
                                                   string searchValue)
        {
            _logger.LogTrace($"ListAsync page: {page}, pageSize: {pageSize}, orderBy: {orderBy}, isAscending: {isAscending}, searchField: {searchField}, searchValue: {searchValue}");

            EntitiesResult<Delivery> entitiesResult = await _deliveryRepository.ListAsync(page, pageSize, orderBy, isAscending, searchField, searchValue);

            EntitiesResultDto<DeliveryDto> entitiesResultDto = _mapper.Map<EntitiesResultDto<DeliveryDto>>(entitiesResult);

            return Ok(entitiesResultDto);
        }

        [HttpGet]
        [ProducesResponseType(typeof(DeliveryDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("{id:guid}")]
        public async Task<IActionResult> FindAsync(Guid id)
        {
            _logger.LogTrace($"FindAsync id: {id}");

            Delivery delivery = await _deliveryRepository.FindAsync(id);

            if (delivery == null)
            {
                _logger.LogTrace($"FindAsync id: {id} not found");
                return NotFound();
            }

            DeliveryDto deliveryDto = _mapper.Map<DeliveryDto>(delivery);

            _logger.LogTrace($"FindAsync DeliveryDto: {JsonConvert.SerializeObject(deliveryDto)}");

            return Ok(deliveryDto);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddAsync([FromBody] DeliveryDto deliveryDto)
        {
            _logger.LogTrace($"AddAsync DeliveryDto: {JsonConvert.SerializeObject(deliveryDto)}");

            if (!ModelState.IsValid)
            {
                _logger.LogTrace($"AddAsync DeliveryDto: {JsonConvert.SerializeObject(deliveryDto)} bad request");
                return BadRequest(ModelState);
            }

            Delivery delivery = _mapper.Map<Delivery>(deliveryDto);

            await _deliveryRepository.AddAsync(delivery);
            await _deliveryRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateAsync([FromBody] DeliveryDto deliveryDto)
        {
            _logger.LogTrace($"UpdateAsync DeliveryDto: {JsonConvert.SerializeObject(deliveryDto)}");
         
            if (!ModelState.IsValid)
            {
                _logger.LogTrace($"UpdateAsync DeliveryDto: {JsonConvert.SerializeObject(deliveryDto)} bad request");
                return BadRequest(ModelState);
            }

            Delivery delivery = _mapper.Map<Delivery>(deliveryDto);

            _deliveryRepository.Update(delivery);
            await _deliveryRepository.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AppExceptionDto), StatusCodes.Status500InternalServerError)]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            _logger.LogTrace($"DeleteAsync id: {id}");
            
            await _deliveryRepository.RemoveAsync(id);
            await _deliveryRepository.SaveChangesAsync();

            return Ok();
        }
    }
}
