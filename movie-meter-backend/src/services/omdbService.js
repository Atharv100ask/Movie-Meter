import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_API_URL = process.env.OMDB_API_URL;

class OMDbService {
  /**
   * Search for movies by title
   * @param {string} title - Movie title to search
   * @param {number} page - Page number for pagination
   * @returns {Promise<Object>} Search results
   */
  async searchMovies(title, page = 1) {
    try {
      const response = await axios.get(OMDB_API_URL, {
        params: {
          apikey: OMDB_API_KEY,
          s: title,
          page: page
        }
      });

      if (response.data.Response === 'False') {
        return { success: false, error: response.data.Error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error searching movies:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get detailed movie information by IMDb ID
   * @param {string} imdbId - IMDb ID of the movie
   * @returns {Promise<Object>} Movie details
   */
  async getMovieById(imdbId) {
    try {
      const response = await axios.get(OMDB_API_URL, {
        params: {
          apikey: OMDB_API_KEY,
          i: imdbId,
          plot: 'full'
        }
      });

      if (response.data.Response === 'False') {
        return { success: false, error: response.data.Error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching movie details:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get detailed movie information by title
   * @param {string} title - Movie title
   * @param {number} year - Optional year
   * @returns {Promise<Object>} Movie details
   */
  async getMovieByTitle(title, year = null) {
    try {
      const params = {
        apikey: OMDB_API_KEY,
        t: title,
        plot: 'full'
      };

      if (year) {
        params.y = year;
      }

      const response = await axios.get(OMDB_API_URL, { params });

      if (response.data.Response === 'False') {
        return { success: false, error: response.data.Error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching movie by title:', error.message);
      return { success: false, error: error.message };
    }
  }
}

export default new OMDbService();
