using API.Exceptions;

namespace API.Middleware;

public class ExceptionHandler(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    // Todo: Logging
    private static async Task HandleExceptionAsync(HttpContext httpContext, Exception ex)
    {
        httpContext.Response.ContentType = "application/json";

        var statusCode = ex switch
        {
            BadRequestException => StatusCodes.Status400BadRequest,

            UnauthorizedException => StatusCodes.Status401Unauthorized,

            NotFoundException => StatusCodes.Status404NotFound,

            ConflictException => StatusCodes.Status409Conflict,

            _ => StatusCodes.Status500InternalServerError
        };

        string errorMessage = ex.Message;

        httpContext.Response.StatusCode = statusCode;

        var errorResponse = new
        {
            StatusCode = statusCode,
            Message = errorMessage,
        };

        await httpContext.Response.WriteAsJsonAsync(errorResponse);
    }
}
