using System;

namespace API.Exceptions;

public class BadRequestException : Exception
{
    public BadRequestException(string message = "Something went wrong ...") : base(message) {}
}
