import { useState } from 'react';

function SearchFilters({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      genre: '',
      year: '',
      rating: '',
      director: '',
      actor: '',
      searchQuery: ''
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-[#2f3136] rounded-lg shadow-xl p-6 mb-8 border border-[#202225]">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Search Query */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search Title
            </label>
            <input
              type="text"
              name="searchQuery"
              value={localFilters.searchQuery}
              onChange={handleInputChange}
              placeholder="Enter movie title..."
              className="w-full px-4 py-2 bg-[#40444b] border border-[#202225] text-white rounded-full focus:ring-2 focus:ring-[#5865f2] focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Genre
            </label>
            <select
              name="genre"
              value={localFilters.genre}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#40444b] border border-[#202225] text-white rounded-full focus:ring-2 focus:ring-[#5865f2] focus:border-transparent"
            >
              <option value="">All Genres</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="animation">Animation</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={localFilters.year}
              onChange={handleInputChange}
              placeholder="e.g., 2023"
              min="1900"
              max="2025"
              className="w-full px-4 py-2 bg-[#40444b] border border-[#202225] text-white rounded-full focus:ring-2 focus:ring-[#5865f2] focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Minimum Rating
            </label>
            <select
              name="rating"
              value={localFilters.rating}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#40444b] border border-[#202225] text-white rounded-full focus:ring-2 focus:ring-[#5865f2] focus:border-transparent"
            >
              <option value="">Any Rating</option>
              <option value="9">9+ Excellent</option>
              <option value="8">8+ Very Good</option>
              <option value="7">7+ Good</option>
              <option value="6">6+ Above Average</option>
              <option value="5">5+ Average</option>
            </select>
          </div>

          {/* Director */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Director
            </label>
            <input
              type="text"
              name="director"
              value={localFilters.director}
              onChange={handleInputChange}
              placeholder="Director name..."
              className="w-full px-4 py-2 bg-[#40444b] border border-[#202225] text-white rounded-full focus:ring-2 focus:ring-[#5865f2] focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Actor */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Actor
            </label>
            <input
              type="text"
              name="actor"
              value={localFilters.actor}
              onChange={handleInputChange}
              placeholder="Actor name..."
              className="w-full px-4 py-2 bg-[#40444b] border border-[#202225] text-white rounded-full focus:ring-2 focus:ring-[#5865f2] focus:border-transparent placeholder-gray-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-[#5865f2] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4752c4] transition-colors shadow-lg"
          >
            Search Movies
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-[#40444b] text-gray-300 border border-[#202225] rounded-full font-semibold hover:bg-[#4f545c] transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchFilters;
