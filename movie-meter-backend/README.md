# Movie Meter Backend

Backend API for Movie Meter that fetches movie data from OMDb API and stores it in a SQLite3 database.

## Features

- Fetch movie data from OMDb API
- Store movies in SQLite3 database
- Search movies with multiple filters (title, genre, year, director, actor, rating)
- RESTful API endpoints
- Fast database queries with indexes

## Tech Stack

- **Node.js** with Express.js
- **SQLite3** with better-sqlite3
- **OMDb API** for movie data
- **Axios** for HTTP requests

## Setup

### 1. Install Dependencies

```bash
cd movie-meter-backend
npm install
```

### 2. Environment Variables

The `.env` file is already configured with your OMDb API key:
```
PORT=3001
OMDB_API_KEY=e4ff7d4c
OMDB_API_URL=http://www.omdbapi.com
DATABASE_PATH=./movie_meter.db
```

### 3. Initialize Database

```bash
npm run init-db
```

This creates the SQLite database with the following tables:
- `movies` - Stores movie information
- `ratings` - Stores movie ratings from different sources

### 4. Seed Database

#### Quick Seed (20 popular movies - ~1 minute)
```bash
npm run seed
```

This fetches 20 popular movies from OMDb API and stores them in the database.

#### Large Seed (Hundreds of movies - 10-30 minutes)
```bash
npm run seed-large
```

This searches OMDb API using multiple strategies:
- Popular keywords (action, drama, comedy, etc.)
- Year-based searches (2023-1990)
- Fetches hundreds of unique movies
- Automatically skips duplicates
- Shows progress in real-time

**Note:** OMDb free tier has a 1000 requests/day limit. The script includes delays to respect rate limits.

### 5. Start Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /health
```

### Fetch and Save Movie from OMDb
```
POST /api/movies/fetch
Body: {
  "title": "Inception",
  "year": 2010  // optional
}
OR
Body: {
  "imdbId": "tt1375666"
}
```

### Search Movies
```
GET /api/movies/search?title=inception&genre=sci-fi&year=2010&director=nolan&actor=dicaprio&minRating=8&fetchFromOMDb=true

Query Parameters:
- title: Movie title (partial match)
- genre: Genre (partial match)
- year: Release year (exact match)
- director: Director name (partial match)
- actor: Actor name (partial match)
- minRating: Minimum IMDb rating
- fetchFromOMDb: If true, fetches from OMDb API first then searches locally
```

### Get All Movies
```
GET /api/movies
```

### Get Movie by IMDb ID
```
GET /api/movies/:imdbId
Example: GET /api/movies/tt1375666
```

### Delete Movie
```
DELETE /api/movies/:imdbId
Example: DELETE /api/movies/tt1375666
```

## Database Schema

### Movies Table
- id (Primary Key)
- imdb_id (Unique)
- title
- year
- rated
- released
- runtime
- genre
- director
- writer
- actors
- plot
- language
- country
- awards
- poster
- imdb_rating
- imdb_votes
- type
- box_office
- production
- created_at
- updated_at

### Ratings Table
- id (Primary Key)
- movie_id (Foreign Key)
- source
- value

## Project Structure

```
movie-meter-backend/
├── src/
│   ├── config/
│   │   ├── database.js        # Database connection
│   │   ├── initDatabase.js    # Database schema initialization
│   │   └── seedDatabase.js    # Database seeding script
│   ├── controllers/
│   │   └── movieController.js # Request handlers
│   ├── models/
│   │   └── movieModel.js      # Database operations
│   ├── routes/
│   │   └── movieRoutes.js     # API routes
│   ├── services/
│   │   └── omdbService.js     # OMDb API integration
│   └── server.js              # Express server setup
├── .env                       # Environment variables
├── package.json
└── README.md
```

## Example Usage

### 1. Fetch a movie from OMDb and save it:
```bash
curl -X POST http://localhost:3001/api/movies/fetch \
  -H "Content-Type: application/json" \
  -d '{"title": "Inception", "year": 2010}'
```

### 2. Search for movies:
```bash
curl "http://localhost:3001/api/movies/search?title=inception&minRating=8"
```

### 3. Get all movies:
```bash
curl http://localhost:3001/api/movies
```

## Notes

- The OMDb API has rate limits on the free tier
- The seed script includes a 300ms delay between requests to avoid rate limiting
- Movies are cached in the local SQLite database to reduce API calls
- Use `fetchFromOMDb=true` parameter to fetch fresh data from OMDb

## License

MIT
