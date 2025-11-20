import db from '../config/database.js';

class MovieModelNew {
  /**
   * Get all movies with their related data from normalized tables
   * @returns {Array} Array of movies with genres, directors, actors, writers
   */
  getAllMovies() {
    const query = `
      SELECT
        m.id,
        m.imdb_id,
        m.title,
        m.year,
        m.rated,
        m.released,
        m.runtime,
        m.plot,
        m.language,
        m.country,
        m.awards,
        m.poster,
        m.imdb_rating,
        m.imdb_votes,
        m.type,
        m.box_office,
        m.production,
        GROUP_CONCAT(DISTINCT g.name) as genre,
        GROUP_CONCAT(DISTINCT d.name) as director,
        GROUP_CONCAT(DISTINCT a.name) as actors,
        GROUP_CONCAT(DISTINCT w.name) as writer
      FROM movies m
      LEFT JOIN MOVIE_GENRES mg ON m.id = mg.movie_id
      LEFT JOIN GENRES g ON mg.genre_id = g.genre_id
      LEFT JOIN MOVIE_DIRECTORS md ON m.id = md.movie_id
      LEFT JOIN DIRECTORS d ON md.director_id = d.director_id
      LEFT JOIN MOVIE_ACTORS ma ON m.id = ma.movie_id
      LEFT JOIN ACTORS a ON ma.actor_id = a.actor_id
      LEFT JOIN MOVIE_WRITERS mw ON m.id = mw.movie_id
      LEFT JOIN WRITERS w ON mw.writer_id = w.writer_id
      GROUP BY m.id
      ORDER BY m.imdb_rating DESC
    `;

    const stmt = db.prepare(query);
    return stmt.all();
  }

  /**
   * Get movie by IMDb ID with all related data
   * @param {string} imdbId - IMDb ID
   * @returns {Object|null} Movie data with all relationships
   */
  getMovieByImdbId(imdbId) {
    const query = `
      SELECT
        m.id,
        m.imdb_id,
        m.title,
        m.year,
        m.rated,
        m.released,
        m.runtime,
        m.plot,
        m.language,
        m.country,
        m.awards,
        m.poster,
        m.imdb_rating,
        m.imdb_votes,
        m.type,
        m.box_office,
        m.production,
        GROUP_CONCAT(DISTINCT g.name) as genre,
        GROUP_CONCAT(DISTINCT d.name) as director,
        GROUP_CONCAT(DISTINCT a.name) as actors,
        GROUP_CONCAT(DISTINCT w.name) as writer
      FROM movies m
      LEFT JOIN MOVIE_GENRES mg ON m.id = mg.movie_id
      LEFT JOIN GENRES g ON mg.genre_id = g.genre_id
      LEFT JOIN MOVIE_DIRECTORS md ON m.id = md.movie_id
      LEFT JOIN DIRECTORS d ON md.director_id = d.director_id
      LEFT JOIN MOVIE_ACTORS ma ON m.id = ma.movie_id
      LEFT JOIN ACTORS a ON ma.actor_id = a.actor_id
      LEFT JOIN MOVIE_WRITERS mw ON m.id = mw.movie_id
      LEFT JOIN WRITERS w ON mw.writer_id = w.writer_id
      WHERE m.imdb_id = ?
      GROUP BY m.id
    `;

    const stmt = db.prepare(query);
    return stmt.get(imdbId);
  }

  /**
   * Get movie by ID with all related data
   * @param {number} id - Movie ID
   * @returns {Object|null} Movie data with all relationships
   */
  getMovieById(id) {
    const query = `
      SELECT
        m.id,
        m.imdb_id,
        m.title,
        m.year,
        m.rated,
        m.released,
        m.runtime,
        m.plot,
        m.language,
        m.country,
        m.awards,
        m.poster,
        m.imdb_rating,
        m.imdb_votes,
        m.type,
        m.box_office,
        m.production,
        GROUP_CONCAT(DISTINCT g.name) as genre,
        GROUP_CONCAT(DISTINCT d.name) as director,
        GROUP_CONCAT(DISTINCT a.name) as actors,
        GROUP_CONCAT(DISTINCT w.name) as writer
      FROM movies m
      LEFT JOIN MOVIE_GENRES mg ON m.id = mg.movie_id
      LEFT JOIN GENRES g ON mg.genre_id = g.genre_id
      LEFT JOIN MOVIE_DIRECTORS md ON m.id = md.movie_id
      LEFT JOIN DIRECTORS d ON md.director_id = d.director_id
      LEFT JOIN MOVIE_ACTORS ma ON m.id = ma.movie_id
      LEFT JOIN ACTORS a ON ma.actor_id = a.actor_id
      LEFT JOIN MOVIE_WRITERS mw ON m.id = mw.movie_id
      LEFT JOIN WRITERS w ON mw.writer_id = w.writer_id
      WHERE m.id = ?
      GROUP BY m.id
    `;

    const stmt = db.prepare(query);
    return stmt.get(id);
  }

  /**
   * Search movies with filters using normalized tables
   * @param {Object} filters - Search filters
   * @returns {Array} Array of matching movies
   */
  searchMovies(filters = {}) {
    let query = `
      SELECT
        m.id,
        m.imdb_id,
        m.title,
        m.year,
        m.rated,
        m.released,
        m.runtime,
        m.plot,
        m.language,
        m.country,
        m.awards,
        m.poster,
        m.imdb_rating,
        m.imdb_votes,
        m.type,
        m.box_office,
        m.production,
        GROUP_CONCAT(DISTINCT g.name) as genre,
        GROUP_CONCAT(DISTINCT d.name) as director,
        GROUP_CONCAT(DISTINCT a.name) as actors,
        GROUP_CONCAT(DISTINCT w.name) as writer
      FROM movies m
      LEFT JOIN MOVIE_GENRES mg ON m.id = mg.movie_id
      LEFT JOIN GENRES g ON mg.genre_id = g.genre_id
      LEFT JOIN MOVIE_DIRECTORS md ON m.id = md.movie_id
      LEFT JOIN DIRECTORS d ON md.director_id = d.director_id
      LEFT JOIN MOVIE_ACTORS ma ON m.id = ma.movie_id
      LEFT JOIN ACTORS a ON ma.actor_id = a.actor_id
      LEFT JOIN MOVIE_WRITERS mw ON m.id = mw.movie_id
      LEFT JOIN WRITERS w ON mw.writer_id = w.writer_id
      WHERE 1=1
    `;

    const params = [];

    if (filters.title) {
      query += ' AND m.title LIKE ?';
      params.push(`%${filters.title}%`);
    }

    if (filters.genre) {
      query += ' AND EXISTS (SELECT 1 FROM MOVIE_GENRES mg2 JOIN GENRES g2 ON mg2.genre_id = g2.genre_id WHERE mg2.movie_id = m.id AND g2.name LIKE ?)';
      params.push(`%${filters.genre}%`);
    }

    if (filters.year) {
      query += ' AND m.year = ?';
      params.push(parseInt(filters.year));
    }

    if (filters.director) {
      query += ' AND EXISTS (SELECT 1 FROM MOVIE_DIRECTORS md2 JOIN DIRECTORS d2 ON md2.director_id = d2.director_id WHERE md2.movie_id = m.id AND d2.name LIKE ?)';
      params.push(`%${filters.director}%`);
    }

    if (filters.actor) {
      query += ' AND EXISTS (SELECT 1 FROM MOVIE_ACTORS ma2 JOIN ACTORS a2 ON ma2.actor_id = a2.actor_id WHERE ma2.movie_id = m.id AND a2.name LIKE ?)';
      params.push(`%${filters.actor}%`);
    }

    if (filters.minRating) {
      query += ' AND m.imdb_rating >= ?';
      params.push(parseFloat(filters.minRating));
    }

    query += ' GROUP BY m.id ORDER BY m.imdb_rating DESC LIMIT 50';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  /**
   * Save a new movie from OMDb API data
   * This method saves to the old movies table and also populates normalized tables
   * @param {Object} movieData - Movie data from OMDb API
   * @returns {Object} Saved movie data
   */
  saveMovie(movieData) {
    return db.transaction(() => {
      // First, insert into the old movies table (for compatibility with seedDatabase)
      const insertMovie = db.prepare(`
        INSERT INTO movies (
          imdb_id, title, year, rated, released, runtime, genre, director,
          writer, actors, plot, language, country, awards, poster,
          imdb_rating, imdb_votes, type, box_office, production
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(imdb_id) DO UPDATE SET
          title = excluded.title,
          year = excluded.year,
          rated = excluded.rated,
          released = excluded.released,
          runtime = excluded.runtime,
          genre = excluded.genre,
          director = excluded.director,
          writer = excluded.writer,
          actors = excluded.actors,
          plot = excluded.plot,
          language = excluded.language,
          country = excluded.country,
          awards = excluded.awards,
          poster = excluded.poster,
          imdb_rating = excluded.imdb_rating,
          imdb_votes = excluded.imdb_votes,
          type = excluded.type,
          box_office = excluded.box_office,
          production = excluded.production,
          updated_at = CURRENT_TIMESTAMP
      `);

      const info = insertMovie.run(
        movieData.imdbID,
        movieData.Title,
        parseInt(movieData.Year) || null,
        movieData.Rated !== 'N/A' ? movieData.Rated : null,
        movieData.Released !== 'N/A' ? movieData.Released : null,
        movieData.Runtime !== 'N/A' ? movieData.Runtime : null,
        movieData.Genre !== 'N/A' ? movieData.Genre : null,
        movieData.Director !== 'N/A' ? movieData.Director : null,
        movieData.Writer !== 'N/A' ? movieData.Writer : null,
        movieData.Actors !== 'N/A' ? movieData.Actors : null,
        movieData.Plot !== 'N/A' ? movieData.Plot : null,
        movieData.Language !== 'N/A' ? movieData.Language : null,
        movieData.Country !== 'N/A' ? movieData.Country : null,
        movieData.Awards !== 'N/A' ? movieData.Awards : null,
        movieData.Poster !== 'N/A' ? movieData.Poster : null,
        parseFloat(movieData.imdbRating) || null,
        movieData.imdbVotes !== 'N/A' ? movieData.imdbVotes : null,
        movieData.Type !== 'N/A' ? movieData.Type : null,
        movieData.BoxOffice !== 'N/A' ? movieData.BoxOffice : null,
        movieData.Production !== 'N/A' ? movieData.Production : null
      );

      const movieId = info.lastInsertRowid || this.getMovieByImdbId(movieData.imdbID).id;

      // Now populate the normalized tables
      // 1. Genres
      if (movieData.Genre && movieData.Genre !== 'N/A') {
        const genres = movieData.Genre.split(',').map(g => g.trim());
        for (const genre of genres) {
          // Insert genre if not exists
          const insertGenre = db.prepare('INSERT OR IGNORE INTO GENRES (name) VALUES (?)');
          insertGenre.run(genre);

          // Link movie to genre
          const linkGenre = db.prepare(`
            INSERT OR IGNORE INTO MOVIE_GENRES (movie_id, genre_id)
            SELECT ?, genre_id FROM GENRES WHERE name = ?
          `);
          linkGenre.run(movieId, genre);
        }
      }

      // 2. Directors
      if (movieData.Director && movieData.Director !== 'N/A') {
        const directors = movieData.Director.split(',').map(d => d.trim());
        for (const director of directors) {
          const insertDirector = db.prepare('INSERT OR IGNORE INTO DIRECTORS (name) VALUES (?)');
          insertDirector.run(director);

          const linkDirector = db.prepare(`
            INSERT OR IGNORE INTO MOVIE_DIRECTORS (movie_id, director_id)
            SELECT ?, director_id FROM DIRECTORS WHERE name = ?
          `);
          linkDirector.run(movieId, director);
        }
      }

      // 3. Actors
      if (movieData.Actors && movieData.Actors !== 'N/A') {
        const actors = movieData.Actors.split(',').map(a => a.trim());
        for (const actor of actors) {
          const insertActor = db.prepare('INSERT OR IGNORE INTO ACTORS (name) VALUES (?)');
          insertActor.run(actor);

          const linkActor = db.prepare(`
            INSERT OR IGNORE INTO MOVIE_ACTORS (movie_id, actor_id)
            SELECT ?, actor_id FROM ACTORS WHERE name = ?
          `);
          linkActor.run(movieId, actor);
        }
      }

      // 4. Writers
      if (movieData.Writer && movieData.Writer !== 'N/A') {
        const writers = movieData.Writer.split(',').map(w => w.trim());
        for (const writer of writers) {
          const insertWriter = db.prepare('INSERT OR IGNORE INTO WRITERS (name) VALUES (?)');
          insertWriter.run(writer);

          const linkWriter = db.prepare(`
            INSERT OR IGNORE INTO MOVIE_WRITERS (movie_id, writer_id)
            SELECT ?, writer_id FROM WRITERS WHERE name = ?
          `);
          linkWriter.run(movieId, writer);
        }
      }

      // 5. Save ratings if available
      if (movieData.Ratings && Array.isArray(movieData.Ratings)) {
        this.saveRatings(movieId, movieData.Ratings);
      }

      return this.getMovieById(movieId);
    })();
  }

  /**
   * Save movie ratings (external ratings like IMDB, Rotten Tomatoes)
   * @param {number} movieId - Movie ID
   * @param {Array} ratings - Array of rating objects
   */
  saveRatings(movieId, ratings) {
    // Delete existing ratings
    const deleteRatings = db.prepare('DELETE FROM ratings WHERE movie_id = ?');
    deleteRatings.run(movieId);

    // Insert new ratings
    const insertRating = db.prepare(`
      INSERT INTO ratings (movie_id, source, value)
      VALUES (?, ?, ?)
    `);

    for (const rating of ratings) {
      const result = insertRating.run(movieId, rating.Source, rating.Value);
      const ratingId = result.lastInsertRowid;

      // Link to MOVIE_RATINGS junction table
      const linkRating = db.prepare(`
        INSERT OR IGNORE INTO MOVIE_RATINGS (movie_id, rating_id)
        VALUES (?, ?)
      `);
      linkRating.run(movieId, ratingId);
    }
  }

  /**
   * Delete a movie by IMDb ID
   * @param {string} imdbId - IMDb ID
   * @returns {boolean} Success status
   */
  deleteMovie(imdbId) {
    const stmt = db.prepare('DELETE FROM movies WHERE imdb_id = ?');
    const info = stmt.run(imdbId);
    return info.changes > 0;
  }

  /**
   * Get user ratings for a movie
   * @param {number} movieId - Movie ID
   * @returns {Array} Array of user ratings
   */
  getUserRatings(movieId) {
    const query = `
      SELECT
        ur.rating_id,
        ur.user_id,
        ur.rating_score,
        ur.rated_at,
        u.username
      FROM USER_RATINGS ur
      JOIN USERS u ON ur.user_id = u.user_id
      WHERE ur.movie_id = ?
      ORDER BY ur.rated_at DESC
    `;

    const stmt = db.prepare(query);
    return stmt.all(movieId);
  }

  /**
   * Add or update a user rating for a movie
   * @param {number} userId - User ID
   * @param {number} movieId - Movie ID
   * @param {number} ratingScore - Rating score (0-10)
   * @returns {Object} Rating data
   */
  addUserRating(userId, movieId, ratingScore) {
    const stmt = db.prepare(`
      INSERT INTO USER_RATINGS (user_id, movie_id, rating_score)
      VALUES (?, ?, ?)
      ON CONFLICT(user_id, movie_id) DO UPDATE SET
        rating_score = excluded.rating_score,
        rated_at = CURRENT_TIMESTAMP
    `);

    stmt.run(userId, movieId, ratingScore);

    const getStmt = db.prepare(`
      SELECT * FROM USER_RATINGS
      WHERE user_id = ? AND movie_id = ?
    `);

    return getStmt.get(userId, movieId);
  }

  /**
   * Get average user rating for a movie
   * @param {number} movieId - Movie ID
   * @returns {number|null} Average rating
   */
  getAverageUserRating(movieId) {
    const stmt = db.prepare(`
      SELECT AVG(rating_score) as avg_rating
      FROM USER_RATINGS
      WHERE movie_id = ?
    `);

    const result = stmt.get(movieId);
    return result.avg_rating ? parseFloat(result.avg_rating.toFixed(2)) : null;
  }
}

export default new MovieModelNew();
