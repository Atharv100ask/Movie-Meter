import omdbService from '../services/omdbService.js';
import movieModel from '../models/movieModelNew.js';

class MovieController {
  /**
   * Fetch movie from OMDb and save to database
   */
  async fetchAndSaveMovie(req, res) {
    try {
      const { title, year, imdbId } = req.body;

      if (!title && !imdbId) {
        return res.status(400).json({
          success: false,
          message: 'Please provide either title or imdbId'
        });
      }

      let result;
      if (imdbId) {
        result = await omdbService.getMovieById(imdbId);
      } else {
        result = await omdbService.getMovieByTitle(title, year);
      }

      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: result.error
        });
      }

      const savedMovie = movieModel.saveMovie(result.data);

      res.json({
        success: true,
        message: 'Movie fetched and saved successfully',
        data: savedMovie
      });
    } catch (error) {
      console.error('Error in fetchAndSaveMovie:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Search movies (from local database or OMDb)
   */
  async searchMovies(req, res) {
    try {
      const { title, genre, year, director, actor, minRating, fetchFromOMDb } = req.query;

      // If fetchFromOMDb is true, fetch from OMDb API first
      if (fetchFromOMDb === 'true' && title) {
        const omdbResult = await omdbService.searchMovies(title);

        if (omdbResult.success && omdbResult.data.Search) {
          // Fetch and save detailed info for each movie
          const savePromises = omdbResult.data.Search.slice(0, 10).map(async (movie) => {
            const detailResult = await omdbService.getMovieById(movie.imdbID);
            if (detailResult.success) {
              movieModel.saveMovie(detailResult.data);
            }
          });

          await Promise.all(savePromises);
        }
      }

      // Search in local database
      const filters = {
        title,
        genre,
        year,
        director,
        actor,
        minRating
      };

      const movies = movieModel.searchMovies(filters);

      res.json({
        success: true,
        count: movies.length,
        data: movies
      });
    } catch (error) {
      console.error('Error in searchMovies:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get all movies from database
   */
  async getAllMovies(req, res) {
    try {
      const movies = movieModel.getAllMovies();

      res.json({
        success: true,
        count: movies.length,
        data: movies
      });
    } catch (error) {
      console.error('Error in getAllMovies:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get movie by IMDb ID
   */
  async getMovieById(req, res) {
    try {
      const { imdbId } = req.params;
      const movie = movieModel.getMovieByImdbId(imdbId);

      if (!movie) {
        return res.status(404).json({
          success: false,
          message: 'Movie not found in database'
        });
      }

      res.json({
        success: true,
        data: movie
      });
    } catch (error) {
      console.error('Error in getMovieById:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Delete movie from database
   */
  async deleteMovie(req, res) {
    try {
      const { imdbId } = req.params;
      const deleted = movieModel.deleteMovie(imdbId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Movie not found'
        });
      }

      res.json({
        success: true,
        message: 'Movie deleted successfully'
      });
    } catch (error) {
      console.error('Error in deleteMovie:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

export default new MovieController();
