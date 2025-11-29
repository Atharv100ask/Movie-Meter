import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SearchFilters from './components/SearchFilters';
import MovieGrid from './components/MovieGrid';
import Header from './components/Header';
import Favorites from './pages/Favorites';

function HomePage() {
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
    <main className="container mx-auto px-4 py-8">
      <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
      <MovieGrid filters={filters} />
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#36393f]">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
