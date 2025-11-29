# Google OAuth Setup Guide for Movie Meter

This guide will help you set up Google OAuth authentication for the Movie Meter application.

## Prerequisites

- A Google account
- Backend and frontend already installed (npm packages)

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - If prompted, configure the OAuth consent screen:
     - Choose "External" user type
     - Fill in app name: "Movie Meter"
     - Add your email as support email
     - Add authorized domains if deploying to production
     - Add scopes: `userinfo.email` and `userinfo.profile`
   - Choose "Web application" as application type
   - Add authorized redirect URIs:
     - `http://localhost:3001/api/auth/google/callback` (for development)
     - Add production URL when deploying
   - Click "Create"

5. Copy your Client ID and Client Secret

## Step 2: Configure Backend Environment Variables

1. Open `movie-meter-backend/.env`
2. Replace the placeholder values:

```env
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

Keep the other values as they are for local development:
```env
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=movie-meter-secret-key-change-in-production
```

## Step 3: Run the Application

### Start the Backend

```bash
cd movie-meter-backend
npm start
```

The backend will:
- Run database migrations to create users and favorites tables
- Start on http://localhost:3001
- Display Google OAuth configuration status

### Start the Frontend

```bash
cd movie-meter-frontend
npm run dev
```

The frontend will start on http://localhost:5173

## Step 4: Test the Authentication

1. Open http://localhost:5173 in your browser
2. Click "Sign in with Google" button in the header
3. You'll be redirected to Google's login page
4. Sign in with your Google account
5. Grant permissions to the app
6. You'll be redirected back to Movie Meter
7. Your profile picture and name should appear in the header

## Features

Once authenticated, you can:

- **Add movies to favorites**: Click the star icon on any movie card
- **View favorites**: Click the "Favorites" button in the header
- **Write reviews**: In the Favorites page, click "Add Review" on any movie
- **Rate movies**: Give a rating from 1-10 when writing reviews
- **Edit reviews**: Update your reviews and ratings anytime
- **Remove favorites**: Remove movies from your favorites list

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Favorites
- `GET /api/favorites` - Get user's favorites (requires auth)
- `POST /api/favorites` - Add to favorites (requires auth)
- `PUT /api/favorites/:id` - Update review/rating (requires auth)
- `DELETE /api/favorites/:id` - Remove from favorites (requires auth)
- `GET /api/favorites/check/:movieId` - Check if favorited (requires auth)

## Database Schema

### Users Table
- `id` - Primary key
- `google_id` - Unique Google user ID
- `email` - User email
- `name` - Display name
- `picture` - Profile picture URL
- `created_at` / `updated_at` - Timestamps

### Favorites Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `movie_id` - Foreign key to movies
- `review` - User's review text (optional)
- `rating` - User's rating 1-10 (optional)
- `created_at` / `updated_at` - Timestamps

## Troubleshooting

### "Google OAuth: ✗ Missing" in backend logs
- Make sure you've added your Client ID and Secret to `.env`
- Restart the backend server after updating `.env`

### "Authentication failed" error
- Check that your redirect URI matches exactly in Google Console
- Ensure cookies are enabled in your browser
- Try clearing browser cookies and cache

### CORS errors
- Verify FRONTEND_URL in backend `.env` matches your frontend URL
- Make sure credentials are included in fetch requests (already configured)

### Session not persisting
- Check that SESSION_SECRET is set in `.env`
- Verify cookies are being set (check browser DevTools > Application > Cookies)

## Production Deployment

When deploying to production:

1. Update environment variables:
   - Set `NODE_ENV=production`
   - Change `SESSION_SECRET` to a strong random string
   - Update `FRONTEND_URL` to your production domain
   - Update `GOOGLE_CALLBACK_URL` to your production API domain

2. Add production URLs to Google Console:
   - Add production redirect URI
   - Add production domain to authorized domains

3. Use HTTPS in production (required by Google OAuth)

## Security Notes

- Never commit `.env` files to version control
- Keep your Client Secret confidential
- Use HTTPS in production
- Rotate SESSION_SECRET periodically in production
- Consider adding rate limiting for authentication endpoints
