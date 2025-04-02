# Real-Time Chat App

A simple real-time chat application built with Next.js, .NET Core, and SignalR websockets for instant real-time messaging.

# How it works

1. Create an account — Quick registration using a username and password.
2. Open your contacts — Easily view and manage your contact list.
3. Chat in real-time — Send and receive messages instantly.

# Features

- Easy registration with username and password
- Real-time chat with SignalR websockets
- Persistent login sessions with cookies
- Optional email notifications opt-in via SMTP
- Upload and display a profile picture with input sanitization on both backend and frontend

# Technologies

## Backend
- .NET Core 9
- Entity Framework Core
- ASP.NET Core Identity
- SignalR
- SQLite
- Google Cloud Bucket Storage

## Frontend
- React (Next.js)

## Email/Notifications
- Postfix
- Dovecot
- TLS for secure communication