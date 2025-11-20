import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { searchMovies, getAllMovies } from '../services/api';

function MovieGrid({ filters }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        let result;

        // Check if any filter is applied
        const hasFilters = filters.searchQuery || filters.genre || filters.year ||
                          filters.director || filters.actor || filters.rating;

        if (hasFilters) {
          result = await searchMovies(filters);
        } else {
          result = await getAllMovies();
        }

        setMovies(result || []);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#5865f2]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-[#2f3136] rounded-lg p-8">
        <svg
          className="mx-auto h-24 w-24 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-xl font-medium text-white">Error Loading Movies</h3>
        <p className="mt-2 text-gray-400">{error}</p>
        <p className="mt-2 text-sm text-gray-500">Make sure the backend server is running on port 3001</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-20 bg-[#2f3136] rounded-lg p-8">
        <svg
          className="mx-auto h-24 w-24 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
        <h3 className="mt-4 text-xl font-medium text-white">No movies found</h3>
        <p className="mt-2 text-gray-400">Try adjusting your search filters or seed the database first</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 text-gray-300 bg-[#2f3136] px-4 py-2 rounded-lg inline-block">
        Found <span className="font-semibold text-[#5865f2]">{movies.length}</span> movie{movies.length !== 1 ? 's' : ''}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieGrid;
