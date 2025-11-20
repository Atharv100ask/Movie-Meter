# Movie Meter - Frontend

A React-based movie search application that allows users to find movies based on various characteristics like genre, year, rating, director, and actors.

## Features

- **Search by multiple criteria:**
  - Movie title
  - Genre (Action, Comedy, Drama, Horror, Sci-Fi, Romance, Thriller, Animation)
  - Release year
  - Minimum rating
  - Director name
  - Actor name

- **Responsive design** with Tailwind CSS
- **Modern UI** with gradient header and card-based layout
- **Filter controls** with reset functionality
- **Loading states** and empty state handling

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App header with title
│   ├── SearchFilters.jsx   # Search and filter controls
│   ├── MovieGrid.jsx       # Grid of movie cards with filtering logic
│   └── MovieCard.jsx       # Individual movie card component
├── App.jsx                 # Main app component
├── index.css              # Tailwind CSS imports
└── main.jsx               # App entry point
```

## Backend Integration (TODO)

Currently using mock data. To connect to the MySQL backend:

1. Update the `MovieGrid.jsx` component to replace the mock data with API calls
2. Create an API service file (e.g., `src/services/api.js`) to handle HTTP requests
3. Add axios or fetch for making API calls to your backend
4. Update the useEffect in MovieGrid to call your backend API endpoints

Example API integration:
```javascript
// In MovieGrid.jsx useEffect
const fetchMovies = async () => {
  try {
    setLoading(true);
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    });
    const data = await response.json();
    setMovies(data);
  } catch (error) {
    console.error('Error fetching movies:', error);
  } finally {
    setLoading(false);
  }
};
```

## License

MIT
