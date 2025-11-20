import { useState } from 'react';
import SearchFilters from './components/SearchFilters';
import MovieGrid from './components/MovieGrid';
import Header from './components/Header';

function App() {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    director: '',
    actor: '',
    searchQuery: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-[#36393f]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
        <MovieGrid filters={filters} />
      </main>
    </div>
  );
}

export default App;
