# Movie Meter 🎬

A full-stack web application for discovering, rating, and reviewing movies. Built with React, Node.js, Express, and SQLite.

## Features

- **Google OAuth Login** - Secure authentication with Google accounts
- **Personal Favorites** - Save your favorite movies with one click
- **Movie Reviews** - Write detailed reviews and rate movies 1-10
- **Advanced Search** - Search movies by title, genre, year, director, actor, and minimum rating
- **Movie Ratings** - View IMDb ratings and user ratings
- **Modern UI** - Discord-inspired dark theme with smooth animations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Movie Details Modal** - View comprehensive movie information in a beautiful popup

## Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Passport.js** - Authentication middleware
- **Google OAuth 2.0** - User authentication
- **SQLite3** - Database (better-sqlite3)
- **OMDb API** - Movie data source

## Database Schema

The application uses a SQLite database with:
- **Movies Table**: Movie information and metadata
- **Ratings Table**: External ratings (IMDb, Rotten Tomatoes, etc.)
- **Users Table**: User accounts (via Google OAuth)
- **Favorites Table**: User's favorite movies with reviews and ratings

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ClassProjectMovie
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd movie-meter-backend

# Install dependencies
npm install
```

**Configuration:**
- The `.env` file is already configured with Google OAuth credentials
- OMDb API key is included
- Database is already populated with 715+ movies
- User/favorites tables will be automatically created on first run

### 3. Frontend Setup

```bash
# Open a new terminal window
cd movie-meter-frontend

# Install dependencies
npm install
```

**Configuration:**
- The `.env` file is already configured to connect to the backend

## Running the Application

You'll need **two terminal windows** to run both servers:

### Terminal 1: Start Backend Server

```bash
cd movie-meter-backend
npm rebuild better-sqlite3
npm start
```

The backend will start on `http://localhost:3001`

### Terminal 2: Start Frontend Server

```bash
cd movie-meter-frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and go to: **http://localhost:5173**

## Project Structure

```
ClassProjectMovie/
├── movie-meter-backend/
│   ├── src/
│   │   ├── config/          # Database and initialization
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # External API services (OMDb)
│   │   └── server.js        # Express server entry point
│   ├── movie_meter.db       # SQLite database (715+ movies)
│   ├── package.json
│   └── .env                 # Environment variables (create this!)
│
└── movie-meter-frontend/
    ├── src/
    │   ├── components/      # React components
    │   │   ├── Header.jsx
    │   │   ├── SearchFilters.jsx
    │   │   ├── MovieGrid.jsx
    │   │   ├── MovieCard.jsx
    │   │   └── MovieModal.jsx
    │   ├── services/        # API integration
    │   ├── App.jsx          # Main app component
    │   └── main.jsx         # React entry point
    ├── package.json
    └── index.html
```

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:imdbId` - Get movie by IMDb ID
- `GET /api/movies/search` - Search movies with filters
  - Query params: `title`, `genre`, `year`, `director`, `actor`, `minRating`
- `POST /api/movies/fetch` - Fetch and save movie from OMDb
- `DELETE /api/movies/:imdbId` - Delete movie

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth login
- `GET /api/auth/google/callback` - OAuth callback endpoint
- `POST /api/auth/logout` - Logout current user
- `GET /api/auth/me` - Get current user info

### Favorites
- `GET /api/favorites` - Get user's favorite movies (requires auth)
- `POST /api/favorites` - Add movie to favorites (requires auth)
- `PUT /api/favorites/:id` - Update review/rating (requires auth)
- `DELETE /api/favorites/:id` - Remove from favorites (requires auth)
- `GET /api/favorites/check/:movieId` - Check if movie is favorited (requires auth)

## Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Seed database with movie data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Usage Guide

### Searching for Movies
1. Use the search filters at the top of the page
2. Enter any combination of:
   - Movie title
   - Genre (dropdown)
   - Year
   - Minimum rating
   - Director name
   - Actor name
3. Click "Search Movies" or "Reset" to clear filters

### User Authentication
1. Click "Sign in with Google" in the header
2. Authorize the app with your Google account
3. Your profile picture and name will appear in the header
4. You can now save favorites and write reviews

### Managing Favorites
1. **Add to favorites**: Click the star icon on any movie card
2. **View favorites**: Click the "Favorites" button in the header
3. **Write a review**:
   - Go to your Favorites page
   - Click "Add Review" on any movie
   - Rate it 1-10 and write your thoughts
4. **Edit/Remove**: Update reviews or remove movies from favorites anytime

### Viewing Movie Details
1. Click the "View Details" button on any movie card
2. A modal will popup showing:
   - Full plot description
   - Complete cast and crew
   - Awards and box office info
   - Direct link to IMDb page
3. Click outside the modal or the X button to close

## Database Information

The database comes pre-populated with:
- **715+ movies** from various genres and years
- Comprehensive movie metadata (cast, crew, ratings, etc.)
- User and favorites tables (created automatically on first run)

## Troubleshooting

### Backend won't start
- Make sure port 3001 is not in use
- Check that `.env` file exists with valid OMDb API key
- Run `npm install` to ensure all dependencies are installed

### Frontend won't start
- Make sure backend is running first
- Check that port 5173 is not in use
- Run `npm install` to ensure all dependencies are installed

### Movies not loading
- Verify backend is running on port 3001
- Check browser console for errors
- Ensure database file exists: `movie-meter-backend/movie_meter.db`

### CORS errors
- Make sure both frontend and backend are running
- Backend should have CORS enabled (already configured)

### Authentication issues
- See [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md) for complete troubleshooting
- Verify Google OAuth credentials are set in backend `.env`
- Check that redirect URIs match in Google Console

## License

This project is created for educational purposes as part of CS 480 coursework.

## Credits

- Movie data powered by [OMDb API](http://www.omdbapi.com/)
