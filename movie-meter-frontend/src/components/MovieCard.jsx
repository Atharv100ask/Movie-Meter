import { useState } from 'react';
import MovieModal from './MovieModal';

function MovieCard({ movie }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#2f3136] rounded-lg shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-[#202225]">
        <img
          src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
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
            className="w-full bg-[#5865f2] text-white py-2 rounded-full hover:bg-[#4752c4] transition-colors font-semibold shadow-lg"
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
