import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from './database.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = db.prepare('SELECT * FROM users WHERE google_id = ?').get(profile.id);

        if (!user) {
          // Create new user
          const insert = db.prepare(`
            INSERT INTO users (google_id, email, name, picture)
            VALUES (?, ?, ?, ?)
          `);

          const result = insert.run(
            profile.id,
            profile.emails?.[0]?.value || '',
            profile.displayName,
            profile.photos?.[0]?.value || ''
          );

          user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
        } else {
          // Update existing user info
          db.prepare(`
            UPDATE users
            SET email = ?, name = ?, picture = ?, updated_at = CURRENT_TIMESTAMP
            WHERE google_id = ?
          `).run(
            profile.emails?.[0]?.value || '',
            profile.displayName,
            profile.photos?.[0]?.value || '',
            profile.id
          );
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
