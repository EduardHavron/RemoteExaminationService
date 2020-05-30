using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RemoteExamination.Common.Exceptions;
using System;
using System.Net;
using System.Threading.Tasks;

namespace RemoteExamination.API.Middleware
{
    public class ErrorHandling
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandling> _logger;

        public ErrorHandling(RequestDelegate next, ILogger<ErrorHandling> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            switch (exception)
            {
                case BusinessLogicException ex:
                    await WriteErrorAsync(context, ex.Message, HttpStatusCode.BadRequest);
                    _logger.LogError(exception, ex.Message);
                    break;

                case DbUpdateException ex:
                    await WriteErrorAsync(context, ex.Message, HttpStatusCode.InternalServerError);
                    _logger.LogError(exception, ex.Message);
                    break;

                default:
                    await WriteErrorAsync(context, exception.Message, HttpStatusCode.InternalServerError);
                    _logger.LogError(exception, exception.Message);
                    break;
            }
        }

        private async Task WriteErrorAsync(HttpContext context, string error, HttpStatusCode statusCode)
        {
            var serializedError = JsonConvert.SerializeObject(new { error });

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            await context.Response.WriteAsync(serializedError);
        }
    }
}