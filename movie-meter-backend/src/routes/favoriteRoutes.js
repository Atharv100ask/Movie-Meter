import express from 'express';
import db from '../config/database.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all favorites for current user
router.get('/', requireAuth, (req, res) => {
  try {
    const favorites = db.prepare(`
      SELECT
        f.*,
        m.imdb_id, m.title, m.year, m.poster, m.genre, m.director,
        m.actors, m.plot, m.imdb_rating
      FROM favorites f
      JOIN movies m ON f.movie_id = m.id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `).all(req.user.id);

    res.json({
      success: true,
      favorites
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching favorites'
    });
  }
});

// Add a movie to favorites
router.post('/', requireAuth, (req, res) => {
  try {
    const { movieId, review, rating } = req.body;

    if (!movieId) {
      return res.status(400).json({
        success: false,
        message: 'Movie ID is required'
      });
    }

    // Check if movie exists
    const movie = db.prepare('SELECT id FROM movies WHERE id = ?').get(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    // Check if already favorited
    const existing = db.prepare(
      'SELECT id FROM favorites WHERE user_id = ? AND movie_id = ?'
    ).get(req.user.id, movieId);

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Movie already in favorites'
      });
    }

    // Add to favorites
    const insert = db.prepare(`
      INSERT INTO favorites (user_id, movie_id, review, rating)
      VALUES (?, ?, ?, ?)
    `);

    const result = insert.run(req.user.id, movieId, review || null, rating || null);

    const favorite = db.prepare(`
      SELECT
        f.*,
        m.imdb_id, m.title, m.year, m.poster, m.genre, m.director,
        m.actors, m.plot, m.imdb_rating
      FROM favorites f
      JOIN movies m ON f.movie_id = m.id
      WHERE f.id = ?
    `).get(result.lastInsertRowid);

    res.json({
      success: true,
      message: 'Movie added to favorites',
      favorite
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding favorite'
    });
  }
});

// Update review/rating for a favorite
router.put('/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { review, rating } = req.body;

    // Check if favorite exists and belongs to user
    const favorite = db.prepare(
      'SELECT id FROM favorites WHERE id = ? AND user_id = ?'
    ).get(id, req.user.id);

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    // Update favorite
    db.prepare(`
      UPDATE favorites
      SET review = ?, rating = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).run(review || null, rating || null, id, req.user.id);

    const updated = db.prepare(`
      SELECT
        f.*,
        m.imdb_id, m.title, m.year, m.poster, m.genre, m.director,
        m.actors, m.plot, m.imdb_rating
      FROM favorites f
      JOIN movies m ON f.movie_id = m.id
      WHERE f.id = ?
    `).get(id);

    res.json({
      success: true,
      message: 'Favorite updated',
      favorite: updated
    });
  } catch (error) {
    console.error('Error updating favorite:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating favorite'
    });
  }
});

// Remove from favorites
router.delete('/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;

    // Check if favorite exists and belongs to user
    const favorite = db.prepare(
      'SELECT id FROM favorites WHERE id = ? AND user_id = ?'
    ).get(id, req.user.id);

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    // Delete favorite
    db.prepare('DELETE FROM favorites WHERE id = ? AND user_id = ?')
      .run(id, req.user.id);

    res.json({
      success: true,
      message: 'Removed from favorites'
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing favorite'
    });
  }
});

// Check if a movie is favorited
router.get('/check/:movieId', requireAuth, (req, res) => {
  try {
    const { movieId } = req.params;

    const favorite = db.prepare(
      'SELECT id FROM favorites WHERE user_id = ? AND movie_id = ?'
    ).get(req.user.id, movieId);

    res.json({
      success: true,
      isFavorited: !!favorite,
      favoriteId: favorite?.id || null
    });
  } catch (error) {
    console.error('Error checking favorite:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking favorite status'
    });
  }
});

export default router;
