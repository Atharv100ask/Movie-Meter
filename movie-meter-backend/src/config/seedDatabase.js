import omdbService from '../services/omdbService.js';
import movieModel from '../models/movieModel.js';

// Popular movies to seed the database
const popularMovies = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Dark Knight', year: 2008 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Interstellar', year: 2014 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'Fight Club', year: 1999 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Empire Strikes Back', year: 1980 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Jurassic Park', year: 1993 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Avengers: Endgame', year: 2019 },
  { title: 'Spider-Man: No Way Home', year: 2021 },
  { title: 'Dune', year: 2021 },
  { title: 'Oppenheimer', year: 2023 }
];

const seedDatabase = async () => {
  console.log('🌱 Starting database seeding...\n');

  let successCount = 0;
  let failCount = 0;

  for (const movie of popularMovies) {
    try {
      console.log(`Fetching: ${movie.title} (${movie.year})...`);

      const result = await omdbService.getMovieByTitle(movie.title, movie.year);

      if (result.success) {
        movieModel.saveMovie(result.data);
        console.log(`✅ Saved: ${result.data.Title}`);
        successCount++;
      } else {
        console.log(`❌ Failed: ${movie.title} - ${result.error}`);
        failCount++;
      }

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`❌ Error fetching ${movie.title}:`, error.message);
      failCount++;
    }
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`   Total: ${popularMovies.length}`);
};

// Run the seeding
seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });
