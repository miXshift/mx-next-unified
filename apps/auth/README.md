# MixShift Authentication App

This is the authentication service for the MixShift platform. It provides:

- Email/password authentication
- Google OAuth authentication
- Session management
- User profile management

## Features

### Authentication Methods

- **Email/Password**: Traditional email and password authentication
- **Google OAuth**: One-click login with Google accounts

### Core Functionality

- User registration and login
- Password reset/recovery flow
- Session management
- Authentication API endpoints
- Protected routes

## Setup and Configuration

### Prerequisites

- Node.js 22 (LTS/Jod)
- Supabase account and project

### Local Development

1. Set up the required environment variables as specified in the main MixShift README
2. Configure OAuth providers:
   - See [Google OAuth Setup](./GOOGLE_OAUTH_SETUP.md) for Google login configuration

## Auth Flow

1. Users visit the `/auth/login` page
2. They can choose to:
   - Login with email/password
   - Sign up with email/password
   - Continue with Google
   - Reset password if forgotten
3. After successful authentication, they are redirected to their requested destination or the home page

## Development

### Key Files

- `/src/app/auth/login/` - Login page and authentication actions
- `/src/app/auth/reset-password/` - Password reset request page
- `/src/app/auth/confirm/` - OAuth and Email confirmation handler (signup/reset password)
- `/src/app/update-password/` - Password update page
- `/src/utils/supabase/` - Supabase client configuration
