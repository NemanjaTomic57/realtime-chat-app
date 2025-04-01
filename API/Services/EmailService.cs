using System;
using System.Net;
using System.Net.Mail;
using System.Web;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Services;

public class EmailService(UserManager<AppUser> userManager)
{
    private readonly string frontendUrl = Environment.GetEnvironmentVariable("FRONTEND") ?? throw new ArgumentNullException();
    private readonly string smtpServer = Environment.GetEnvironmentVariable("SMTP_SERVER") ?? throw new ArgumentNullException();
    private readonly string smtpPort = Environment.GetEnvironmentVariable("SMTP_PORT") ?? throw new ArgumentNullException();
    private readonly string smtpSenderName = Environment.GetEnvironmentVariable("SMTP_SENDER_NAME") ?? throw new ArgumentNullException();
    private readonly string smtpSenderEmail = Environment.GetEnvironmentVariable("SMTP_SENDER_EMAIL") ?? throw new ArgumentNullException();
    private readonly string smtpUsername = Environment.GetEnvironmentVariable("SMTP_USERNAME") ?? throw new ArgumentNullException();
    private readonly string smtpPassword = Environment.GetEnvironmentVariable("SMTP_PASSWORD") ?? throw new ArgumentNullException();

    public async Task SendChangeEmailLink(AppUser user)
    {
        if (user.Email == null) return;

        var token = await userManager.GenerateChangeEmailTokenAsync(user, user.Email);
        var encodedEmail = HttpUtility.UrlEncode(user.Email);
        var encodedToken = HttpUtility.UrlEncode(token);

        var callbackUrl = $"{frontendUrl}email-confirmation?email={encodedEmail}&token={encodedToken}";
        var subject = "Real-Time Chat App - Your link to change your email";
        var bodyContent = $"There was a request being made to change your email. You can verify your email <strong><a href='{callbackUrl}'>with this link</a></strong>.";

        var email = new Email
        {
            ToEmail = user.Email,
            Subject = subject,
            HtmlBody = bodyContent,
        };

        await SendEmailAsync(email);
    }

    public async Task NewNotification(string userEmail)
    {
        var subject = "Real-Time Chat App";
        var bodyContent = $"Somebody sent you a new notification! Log in via this link: {frontendUrl}";

        var email = new Email
        {
            ToEmail = userEmail,
            Subject = subject,
            HtmlBody = bodyContent,
        };

        await SendEmailAsync(email);
    }

    public async Task NewRegistration()
    {
        var subject = "Information Bot";
        var bodyContent = $"Somebody is using your Real-Time Chat Application.";

        var email = new Email
        {
            ToEmail = "nemanja.tomic@ik.me",
            Subject = subject,
            HtmlBody = bodyContent,
        };

        await SendEmailAsync(email);
    }

    private async Task SendEmailAsync(Email email)
    {
        var smtpClient = new SmtpClient(smtpServer)
        {
            Port = int.Parse(smtpPort),
            Credentials = new NetworkCredential(
                smtpUsername,
                smtpPassword
            ),
            EnableSsl = true,
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(smtpSenderEmail, smtpSenderName),
            Subject = email.Subject,
            Body = email.HtmlBody,
            IsBodyHtml = true
        };

        mailMessage.To.Add(email.ToEmail);

        try
        {
            await smtpClient.SendMailAsync(mailMessage);
        }
        catch (SmtpException ex)
        {
            Console.WriteLine("SMTP Error: " + ex);
        }
    }

}
