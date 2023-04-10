using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using WebApi.Controllers.Dto;

namespace WebApi.Middleware
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger _logger;

        public ErrorHandlerMiddleware(
            RequestDelegate next,
            IWebHostEnvironment environment,
            ILogger<ErrorHandlerMiddleware> logger
            )
        {
            _next = next;
            _environment = environment;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                var response = context.Response;
                response.ContentType = "application/json";
                response.StatusCode = StatusCodes.Status500InternalServerError;

                AppExceptionDto appExceptionDto;

                if (_environment.IsDevelopment())
                {
                    appExceptionDto = new AppExceptionDto()
                    {
                        StatusCode = StatusCodes.Status500InternalServerError,
                        Message = ex.Message,
                        Source = ex.Source,
                        StackTrace = ex.StackTrace
                    };
                }
                else
                {
                    appExceptionDto = new AppExceptionDto()
                    {
                        StatusCode = StatusCodes.Status500InternalServerError,
                        Message = "Something wrong happend!",
                    };
                }

                var result = JsonConvert.SerializeObject(appExceptionDto);
                await response.WriteAsync(result);
            }
        }
    }
}
