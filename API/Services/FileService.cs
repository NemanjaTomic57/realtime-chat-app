using System;
using API.Exceptions;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;

namespace API.Services;

public class FileService
{
    private readonly string _serviceAccountKeyPath = Environment.GetEnvironmentVariable("GOOGLE_API_CREDENTIALS") 
        ?? throw new NullReferenceException();
    private readonly StorageClient storageClient;
    private readonly string bucketName = "realtime-chat-app";
    private readonly List<string> allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

    public FileService()
    {
        var googleCredentials = GoogleCredential.FromFile(_serviceAccountKeyPath);

        storageClient = StorageClient.Create(googleCredentials);
    }

    public async Task<string> UploadImage(IFormFile image)
    {
        if (!allowedImageTypes.Contains(image.ContentType))
            throw new BadRequestException("Unsupported file type.");

        if (image.Length > 5 * 1024 * 1024)
            throw new BadRequestException("Image too large (max. 5 MB)");

        var sanitizedFileName = Path.GetFileName(image.FileName);

        var fileName = $"{Guid.NewGuid()}_{sanitizedFileName}";

        using (var stream = image.OpenReadStream())
        {
            await storageClient.UploadObjectAsync(bucketName, fileName, image.ContentType, stream);
        }

        return $"https://storage.googleapis.com/{bucketName}/{fileName}";
    }
}
