namespace API.Exceptions;

public class InternalServerErrorException : Exception
{
    public InternalServerErrorException(string message = "Something went wrong ...") : base(message) 
    {

    }
}
