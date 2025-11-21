# Movie Meter 🎬

A full-stack web application for discovering, rating, and reviewing movies. Built with React, Node.js, Express, and SQLite.

## Features

- 🔍 **Advanced Search** - Search movies by title, genre, year, director, actor, and minimum rating
- **Movie Ratings** - View IMDb ratings and user ratings
- **Reviews & Comments** - Read and write movie reviews with community comments
- **Watchlists** - Create and manage personal watchlists
- **Modern UI** - Discord-inspired dark theme with smooth animations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Movie Details Modal** - View comprehensive movie information in a beautiful popup

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **SQLite3** - Database (better-sqlite3)
- **OMDb API** - Movie data source

## Database Schema

The application uses a fully normalized relational database with:
- **Core Tables**: Users, Movies, Genres, Directors, Actors, Writers
- **Junction Tables**: Movie-Genres, Movie-Directors, Movie-Actors, Movie-Writers, Movie-Ratings
- **User Features**: User Ratings, Reviews, Comments, Recommendations, Watchlists

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

# Create .env file with your OMDb API key
echo "OMDB_API_KEY=your_api_key_here" > .env
echo "PORT=3001" >> .env

# The database is already populated with 715+ movies
# If you need to reseed, run:
npm run seed
```

**Get your FREE OMDb API Key:**
1. Visit [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. Enter your email and select "FREE" (1,000 daily requests)
3. Verify your email
4. Copy the API key to your `.env` file

### 3. Frontend Setup

```bash
# Open a new terminal window
cd movie-meter-frontend

# Install dependencies
npm install
```

## Running the Application

You'll need **two terminal windows** to run both servers:

### Terminal 1: Start Backend Server

```bash
cd movie-meter-backend
npm start
```

The backend will start on `http://localhost:3001`

### Terminal 2: Start Frontend Server

```bash
cd movie-meter-frontend
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is in use)

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
- **715 movies** from various genres
- **27 genres** (Action, Drama, Comedy, Horror, etc.)
- **573 directors**
- **1,578 actors**
- **968 writers**
- **5 sample users** with ratings and reviews

## Features Coming Soon

- User authentication and profiles
- Add movies to personal watchlists
- Write and edit reviews
- Comment on reviews
- Movie recommendations
- Filter by multiple genres
- Sort by rating, year, or popularity

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

## Contributing

This is a CS 480 class project. For any issues or suggestions, please contact the development team.

## License

This project is created for educational purposes as part of CS 480 coursework.

## Credits

- Movie data powered by [OMDb API](http://www.omdbapi.com/)
- UI inspired by Discord's design system