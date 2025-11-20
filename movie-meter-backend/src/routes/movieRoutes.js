import express from 'express';
import movieController from '../controllers/movieController.js';

const router = express.Router();

// POST /api/movies/fetch - Fetch movie from OMDb and save to database
router.post('/fetch', movieController.fetchAndSaveMovie);

// GET /api/movies/search - Search movies with filters
router.get('/search', movieController.searchMovies);

// GET /api/movies - Get all movies
router.get('/', movieController.getAllMovies);

// GET /api/movies/:imdbId - Get movie by IMDb ID
router.get('/:imdbId', movieController.getMovieById);

// DELETE /api/movies/:imdbId - Delete movie
router.delete('/:imdbId', movieController.deleteMovie);

export default router;
