import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../context/AuthContext';
import ReviewModal from '../components/ReviewModal';

function Favorites() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { favorites, loading, removeFavorite, updateFavorite } = useFavorites();
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-[#2f3136] rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Sign in Required</h2>
          <p className="text-gray-400 mb-6">
            Please sign in with Google to view and manage your favorite movies.
          </p>
          <button
            onClick={login}
            className="px-6 py-3 bg-white text-gray-800 hover:bg-gray-100 rounded-md transition-colors font-medium"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-400">Loading favorites...</p>
      </div>
    );
  }

  const handleRemove = async (favoriteId) => {
    if (confirm('Are you sure you want to remove this from favorites?')) {
      await removeFavorite(favoriteId);
    }
  };

  const handleReview = (favorite) => {
    setSelectedFavorite(favorite);
    setShowReviewModal(true);
  };

  const handleSaveReview = async (review, rating) => {
    if (selectedFavorite) {
      await updateFavorite(selectedFavorite.id, review, rating);
      setShowReviewModal(false);
      setSelectedFavorite(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">My Favorite Movies</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-md transition-colors font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Movies
        </button>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-[#2f3136] rounded-lg p-8 text-center">
          <p className="text-gray-400 text-lg mb-4">
            You haven't added any favorites yet. Start browsing movies and add your favorites!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-md transition-colors font-medium"
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-[#2f3136] rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={favorite.poster !== 'N/A' ? favorite.poster : '/placeholder-movie.png'}
                  alt={favorite.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-yellow-400 font-bold">
                  ⭐ {favorite.imdb_rating || 'N/A'}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1">{favorite.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{favorite.year}</p>

                {favorite.review && (
                  <div className="mb-3 p-3 bg-[#202225] rounded">
                    <p className="text-sm text-gray-300 italic">&ldquo;{favorite.review}&rdquo;</p>
                    {favorite.rating && (
                      <p className="text-xs text-yellow-400 mt-2">
                        Your rating: {favorite.rating}/10
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleReview(favorite)}
                    className="flex-1 px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded transition-colors font-medium"
                  >
                    {favorite.review ? 'Edit Review' : 'Add Review'}
                  </button>
                  <button
                    onClick={() => handleRemove(favorite.id)}
                    className="px-4 py-2 bg-[#ed4245] hover:bg-[#c03537] text-white rounded transition-colors font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showReviewModal && selectedFavorite && (
        <ReviewModal
          favorite={selectedFavorite}
          onSave={handleSaveReview}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedFavorite(null);
          }}
        />
      )}
    </div>
  );
}

export default Favorites;
