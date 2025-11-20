import db from './database.js';

const createTables = () => {
  // Movies table
  db.exec(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      imdb_id TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      year INTEGER,
      rated TEXT,
      released TEXT,
      runtime TEXT,
      genre TEXT,
      director TEXT,
      writer TEXT,
      actors TEXT,
      plot TEXT,
      language TEXT,
      country TEXT,
      awards TEXT,
      poster TEXT,
      imdb_rating REAL,
      imdb_votes TEXT,
      type TEXT,
      box_office TEXT,
      production TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Ratings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movie_id INTEGER NOT NULL,
      source TEXT NOT NULL,
      value TEXT NOT NULL,
      FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
    );
  `);

  // Create indexes for better query performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_movies_title ON movies(title);
    CREATE INDEX IF NOT EXISTS idx_movies_year ON movies(year);
    CREATE INDEX IF NOT EXISTS idx_movies_genre ON movies(genre);
    CREATE INDEX IF NOT EXISTS idx_movies_director ON movies(director);
    CREATE INDEX IF NOT EXISTS idx_movies_imdb_rating ON movies(imdb_rating);
  `);

  console.log('✅ Database tables created successfully!');
};

// Run the initialization
try {
  createTables();
} catch (error) {
  console.error('❌ Error creating tables:', error);
  process.exit(1);
}
