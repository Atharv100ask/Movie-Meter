import { useState, useEffect } from 'react';
import MovieModal from './MovieModal';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../hooks/useFavorites';

function MovieCard({ movie }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posterSrc, setPosterSrc] = useState('/image-placeholder.png');
  const { user, login } = useAuth();
  const { isFavorited, addFavorite, getFavoriteByMovieId, removeFavorite } = useFavorites();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Reset to placeholder when movie changes
    setPosterSrc('/image-placeholder.png');

    // Check if poster URL exists and is not 'N/A'
    if (!movie.poster || movie.poster === 'N/A') {
      return;
    }

    // Preload and validate the image
    const img = new Image();
    img.onload = () => {
      setPosterSrc(movie.poster);
    };
    img.onerror = () => {
      setPosterSrc('/image-placeholder.png');
    };
    img.src = movie.poster;
  }, [movie.poster]);

  const handleFavoriteClick = async () => {
    if (!user) {
      login();
      return;
    }

    setIsProcessing(true);
    try {
      if (isFavorited(movie.id)) {
        const favorite = getFavoriteByMovieId(movie.id);
        await removeFavorite(favorite.id);
      } else {
        await addFavorite(movie.id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const favorited = user && isFavorited(movie.id);

  return (
    <>
      <div className="bg-[#2f3136] rounded-lg shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-[#202225] flex flex-col">
        <div className="relative">
          <img
            src={posterSrc}
            alt={movie.title}
            className="w-full h-auto object-contain bg-[#202225]"
          />
          <button
            onClick={handleFavoriteClick}
            disabled={isProcessing}
            className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 p-2 rounded-full transition-all disabled:opacity-50"
            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className={`w-6 h-6 ${favorited ? 'text-yellow-400 fill-current' : 'text-white'}`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </button>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400 bg-[#40444b] px-2 py-1 rounded">{movie.year}</span>
            {movie.imdb_rating && (
              <div className="flex items-center bg-[#40444b] px-2 py-1 rounded">
                <svg
                  className="w-5 h-5 text-[#faa61a] fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="ml-1 text-sm font-semibold text-white">
                  {movie.imdb_rating}/10
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-[#5865f2]">Genre:</span> {movie.genre || 'N/A'}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-[#5865f2]">Director:</span> {movie.director || 'N/A'}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#5865f2] text-white py-2 rounded-full hover:bg-[#4752c4] transition-colors font-semibold shadow-lg mt-auto"
          >
            View Details
          </button>
        </div>
      </div>

      <MovieModal
        movie={movie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default MovieCard;
