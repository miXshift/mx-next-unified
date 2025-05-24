# Google OAuth Setup

To enable Google login in the auth app, follow these steps:

## 1. Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" and select "OAuth client ID"
5. Set up the OAuth consent screen if required
6. For "Application type", select "Web application"
7. Add a name for your OAuth client
8. Add authorized JavaScript origins:
   - For development: `http://auth.mixshift.local:3000`
   - For production: Add your production domain
9. Add authorized redirect URIs:
   - For development: `http://auth.mixshift.local:3000/auth/callback`
   - For production: Add your production domain with the same path
10. Click "Create" and note down your Client ID and Client Secret

## 2. Configure Supabase Authentication

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to Authentication > Providers
4. Find "Google" and enable it
5. Enter the Client ID and Client Secret obtained from Google Cloud Console
6. Save changes

## 3. Update Environment Variables

If you want to use environment variables instead of the Supabase dashboard settings:

1. Add the following to your `.env` file:
   ```
   SUPABASE_AUTH_GOOGLE_CLIENT_ID=<your-google-client-id>
   SUPABASE_AUTH_GOOGLE_SECRET=<your-google-client-secret>
   ```

The auth app should now support Google login.
