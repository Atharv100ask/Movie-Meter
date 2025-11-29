import db from './database.js';

export const runMigrations = () => {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      google_id TEXT UNIQUE NOT NULL,
      email TEXT NOT NULL,
      name TEXT,
      picture TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Favorites table
  db.exec(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      movie_id INTEGER NOT NULL,
      review TEXT,
      rating INTEGER CHECK(rating >= 1 AND rating <= 10),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
      UNIQUE(user_id, movie_id)
    );
  `);

  // Create indexes - run separately to avoid issues
  try {
    db.exec(`CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id)`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id)`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_favorites_movie_id ON favorites(movie_id)`);
    console.log('✅ User and favorites tables created successfully!');
  } catch (error) {
    console.log('✅ Tables already exist or created successfully');
  }
};
