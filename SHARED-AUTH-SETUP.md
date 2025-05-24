# Cross-App Authentication Setup

This document explains how authentication works across different apps in the MixShift platform.

## Overview

The platform uses Supabase for authentication but allows each app to connect to different Supabase projects. The authentication is shared via a custom cookie that contains a JWT token.

## How It Works

1. The `auth` app is responsible for user authentication (login, signup, etc.)
2. Upon successful authentication, the auth app:
   - Creates a Supabase session in its own Supabase project
   - Extracts the access token
   - Sets a shared cookie (`mixshift_auth_token`) with the JWT token
   - The cookie is configured to be accessible across subdomains

3. Other apps (like `report-center`):
   - Check for the presence of the shared authentication cookie
   - Use the token to initialize their Supabase client
   - Connect to their own Supabase project, but with the user's authentication

## Requirements

- All Supabase projects must share the same JWT secret
- All apps must be hosted under the same top-level domain (for cookie sharing)
- Environment variables must be properly configured (see .env.example files)

## Configuring Supabase Projects

1. Create separate Supabase projects for each app
2. In each project, go to Settings > API > JWT Settings
3. Set the same JWT Secret for all projects
4. Make sure each app has its own project URL and anon key configured

## Environment Variables

Each app requires the following environment variables:

```
# Supabase configuration - specific to each app's project
NEXT_PUBLIC_SUPABASE_URL=https://your-specific-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-specific-project-anon-key

# Shared JWT secret - must be the same across all apps
SUPABASE_JWT_SECRET=your-supabase-jwt-secret

# Cookie configuration for cross-domain authentication
COOKIE_OPTION_PATH=/
COOKIE_OPTION_SECURE=yes
COOKIE_OPTION_DOMAIN=.yourdomain.com
COOKIE_OPTION_SAME_SITE=lax
AUTH_COOKIE_MAX_AGE=604800 # 7 days in seconds

# App URLs
NEXT_PUBLIC_BASE_URL=https://your-app-domain.com
AUTH_APP_URL=https://auth.yourdomain.com
```

## Flow

1. User visits report-center app
2. If not authenticated (no valid token in shared cookie), they're redirected to auth app
3. User authenticates on auth app
4. Auth app sets the shared auth cookie and redirects back to report-center
5. Report-center reads the shared cookie and initializes Supabase with the token
6. User can now access authenticated features in the report-center app
