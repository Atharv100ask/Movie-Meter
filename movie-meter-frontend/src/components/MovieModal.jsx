function MovieModal({ movie, isOpen, onClose }) {
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

        <div className="flex flex-col md:flex-row">
          {/* Movie Poster */}
          <div className="md:w-1/3">
            <img
              src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
            />
          </div>

          {/* Movie Details */}
          <div className="md:w-2/3 p-6 space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
              <div className="flex items-center gap-3 flex-wrap">
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
                {movie.imdb_rating && (
                  <div className="flex items-center bg-[#40444b] px-3 py-1 rounded-full">
                    <svg className="w-5 h-5 text-[#faa61a] fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="ml-1 text-sm font-semibold text-white">
                      {movie.imdb_rating}/10
                    </span>
                  </div>
                )}
              </div>
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

            {/* IMDb Link */}
            {movie.imdb_id && (
              <div className="pt-4">
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#5865f2] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#4752c4] transition-colors"
                >
                  View on IMDb
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
