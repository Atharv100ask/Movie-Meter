import { useState, useEffect } from 'react';

function MovieModal({ movie, isOpen, onClose }) {
  const [posterSrc, setPosterSrc] = useState('/image-placeholder.png');

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#2f3136] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#202225] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row p-4 md:p-6">
          {/* Movie Poster and Info */}
          <div className="md:w-1/3">
            <img
              src={posterSrc}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-lg"
            />
            {/* Year, Runtime, Rating below poster */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-400 bg-[#40444b] px-3 py-1 rounded-full">
                  {movie.year}
                </span>
                {movie.rated && (
                  <span className="text-sm text-gray-400 bg-[#40444b] px-3 py-1 rounded-full">
                    {movie.rated}
                  </span>
                )}
                {movie.runtime && (
                  <span className="text-sm text-gray-400 bg-[#40444b] px-3 py-1 rounded-full">
                    {movie.runtime}
                  </span>
                )}
              </div>
              {movie.imdb_rating && (
                <div className="flex items-center bg-[#40444b] px-3 py-1 rounded-full w-fit">
                  <svg className="w-5 h-5 text-[#faa61a] fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="ml-1 text-sm font-semibold text-white">
                    {movie.imdb_rating}/10
                  </span>
                </div>
              )}
              {/* IMDb Link */}
              {movie.imdb_id && (
                <div>
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#5865f2] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#4752c4] transition-colors w-full text-center"
                  >
                    View on IMDb
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Movie Details */}
          <div className="md:w-2/3 p-6 space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
            </div>

            {/* Plot */}
            {movie.plot && (
              <div>
                <h3 className="text-lg font-semibold text-[#5865f2] mb-2">Plot</h3>
                <p className="text-gray-300 leading-relaxed">{movie.plot}</p>
              </div>
            )}

            {/* Genre */}
            {movie.genre && (
              <div>
                <h3 className="text-lg font-semibold text-[#5865f2] mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.split(',').map((genre, index) => (
                    <span
                      key={index}
                      className="bg-[#5865f2] text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Director */}
            {movie.director && (
              <div>
                <h3 className="text-lg font-semibold text-[#5865f2] mb-2">Director</h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>
            )}

            {/* Actors */}
            {movie.actors && (
              <div>
                <h3 className="text-lg font-semibold text-[#5865f2] mb-2">Cast</h3>
                <p className="text-gray-300">{movie.actors}</p>
              </div>
            )}

            {/* Writers */}
            {movie.writer && (
              <div>
                <h3 className="text-lg font-semibold text-[#5865f2] mb-2">Writers</h3>
                <p className="text-gray-300">{movie.writer}</p>
              </div>
            )}

            {/* Language */}
            {movie.language && (
              <div>
                <h3 className="text-lg font-semibold text-[#5865f2] mb-2">Language</h3>
                <p className="text-gray-300">{movie.language}</p>
              </div>
            )}

            {/* Country */}
            {movie.country && (
              <div>
                <h3 className="text-lg font-semibold text-[#5865f2] mb-2">Country</h3>
                <p className="text-gray-300">{movie.country}</p>
              </div>
            )}

            {/* Awards */}
            {movie.awards && (
              <div>
                <h3 className="text-lg font-semibold text-[#5865f2] mb-2">Awards</h3>
                <p className="text-gray-300">{movie.awards}</p>
              </div>
            )}

            {/* Box Office */}
            {movie.box_office && (
              <div>
                <h3 className="text-lg font-semibold text-[#5865f2] mb-2">Box Office</h3>
                <p className="text-gray-300">{movie.box_office}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
