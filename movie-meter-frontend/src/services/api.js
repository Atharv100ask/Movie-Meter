const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Search movies with filters
 * @param {Object} filters - Search filters
 * @returns {Promise<Array>} Array of movies
 */
export const searchMovies = async (filters) => {
  try {
    const params = new URLSearchParams();

    if (filters.searchQuery) params.append('title', filters.searchQuery);
    if (filters.genre) params.append('genre', filters.genre);
    if (filters.year) params.append('year', filters.year);
    if (filters.director) params.append('director', filters.director);
    if (filters.actor) params.append('actor', filters.actor);
    if (filters.rating) params.append('minRating', filters.rating);

    const response = await fetch(`${API_BASE_URL}/movies/search?${params}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch movies');
    }

    return data.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get all movies from database
 * @returns {Promise<Array>} Array of all movies
 */
export const getAllMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch movies');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching all movies:', error);
    throw error;
  }
};

/**
 * Fetch movie from OMDb and save to database
 * @param {Object} movieData - { title, year } or { imdbId }
 * @returns {Promise<Object>} Saved movie data
 */
export const fetchAndSaveMovie = async (movieData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/fetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch and save movie');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching and saving movie:', error);
    throw error;
  }
};

/**
 * Get movie by IMDb ID
 * @param {string} imdbId - IMDb ID
 * @returns {Promise<Object>} Movie data
 */
export const getMovieById = async (imdbId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${imdbId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch movie');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};
