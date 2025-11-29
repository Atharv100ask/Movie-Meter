import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/favorites`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites || []);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (movieId, review = null, rating = null) => {
    try {
      const response = await fetch(`${API_URL}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ movieId, review, rating })
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(prev => [data.favorite, ...prev]);
        return { success: true, favorite: data.favorite };
      } else {
        const error = await response.json();
        return { success: false, message: error.message };
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      return { success: false, message: 'Error adding favorite' };
    }
  };

  const updateFavorite = async (favoriteId, review, rating) => {
    try {
      const response = await fetch(`${API_URL}/api/favorites/${favoriteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ review, rating })
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(prev =>
          prev.map(fav => fav.id === favoriteId ? data.favorite : fav)
        );
        return { success: true, favorite: data.favorite };
      } else {
        const error = await response.json();
        return { success: false, message: error.message };
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
      return { success: false, message: 'Error updating favorite' };
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      const response = await fetch(`${API_URL}/api/favorites/${favoriteId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, message: error.message };
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      return { success: false, message: 'Error removing favorite' };
    }
  };

  const isFavorited = (movieId) => {
    return favorites.some(fav => fav.movie_id === movieId);
  };

  const getFavoriteByMovieId = (movieId) => {
    return favorites.find(fav => fav.movie_id === movieId);
  };

  return {
    favorites,
    loading,
    addFavorite,
    updateFavorite,
    removeFavorite,
    isFavorited,
    getFavoriteByMovieId,
    refetch: fetchFavorites
  };
};
