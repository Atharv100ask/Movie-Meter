import omdbService from '../services/omdbService.js';
import movieModel from '../models/movieModel.js';

/**
 * Large seeding script that searches for movies by popular keywords
 * and fetches multiple pages of results from OMDb API
 */

// Popular search terms to get a variety of movies
const searchTerms = [
  'action', 'adventure', 'comedy', 'drama', 'thriller', 'horror', 'sci-fi',
  'romance', 'mystery', 'fantasy', 'animation', 'superhero', 'war', 'western',
  'love', 'man', 'woman', 'life', 'world', 'time', 'day', 'night',
  'death', 'family', 'king', 'queen', 'battle', 'fight', 'the', 'a'
];

// Years to search for diverse collection
const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
               2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004,
               2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994,
               1993, 1992, 1991, 1990];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchMoviesBySearch = async (searchTerm, page = 1) => {
  try {
    console.log(`Searching for "${searchTerm}" (page ${page})...`);
    const result = await omdbService.searchMovies(searchTerm, page);

    if (result.success && result.data.Search) {
      return result.data.Search;
    }
    return [];
  } catch (error) {
    console.error(`Error searching for ${searchTerm}:`, error.message);
    return [];
  }
};

const fetchAndSaveMovieDetails = async (imdbId) => {
  try {
    // Check if movie already exists
    const existing = movieModel.getMovieByImdbId(imdbId);
    if (existing) {
      return { status: 'exists', imdbId };
    }

    const result = await omdbService.getMovieById(imdbId);

    if (result.success && result.data.Type === 'movie') {
      movieModel.saveMovie(result.data);
      return { status: 'saved', title: result.data.Title, imdbId };
    }

    return { status: 'skipped', reason: result.error || 'Not a movie' };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
};

const seedDatabaseLarge = async () => {
  console.log('🎬 Starting LARGE database seeding...\n');
  console.log('This will fetch hundreds of movies from OMDb API');
  console.log('Estimated time: 10-30 minutes depending on API rate limits\n');

  let totalSaved = 0;
  let totalExists = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  const processedIds = new Set();

  // Strategy 1: Search by popular terms
  console.log('📚 Phase 1: Searching by popular keywords...\n');

  for (const term of searchTerms) {
    // Fetch first 2 pages for each search term (20 results)
    for (let page = 1; page <= 2; page++) {
      const searchResults = await fetchMoviesBySearch(term, page);

      if (searchResults.length === 0) break;

      console.log(`Found ${searchResults.length} results for "${term}" (page ${page})`);

      for (const movie of searchResults) {
        if (processedIds.has(movie.imdbID)) continue;

        processedIds.add(movie.imdbID);
        const result = await fetchAndSaveMovieDetails(movie.imdbID);

        if (result.status === 'saved') {
          totalSaved++;
          console.log(`  ✅ [${totalSaved}] Saved: ${result.title}`);
        } else if (result.status === 'exists') {
          totalExists++;
        } else if (result.status === 'skipped') {
          totalSkipped++;
        } else if (result.status === 'error') {
          totalErrors++;
          console.log(`  ❌ Error: ${result.error}`);
        }

        // Delay to avoid rate limiting (1000 requests per day on free tier)
        await delay(250);
      }

      // Delay between pages
      await delay(500);
    }

    // Log progress
    console.log(`Progress: ${totalSaved} saved | ${totalExists} exist | ${totalSkipped} skipped | ${totalErrors} errors\n`);

    // Small delay between search terms
    await delay(300);
  }

  // Strategy 2: Search by year + common words
  console.log('\n📅 Phase 2: Searching by year + keywords...\n');

  const yearSearchTerms = ['love', 'war', 'man', 'the'];

  for (const year of years.slice(0, 15)) { // Last 15 years
    for (const term of yearSearchTerms) {
      const searchResults = await fetchMoviesBySearch(`${term} ${year}`, 1);

      if (searchResults.length === 0) continue;

      console.log(`Found ${searchResults.length} results for "${term}" in ${year}`);

      for (const movie of searchResults) {
        if (processedIds.has(movie.imdbID)) continue;

        processedIds.add(movie.imdbID);
        const result = await fetchAndSaveMovieDetails(movie.imdbID);

        if (result.status === 'saved') {
          totalSaved++;
          if (totalSaved % 10 === 0) {
            console.log(`  ✅ [${totalSaved}] Saved: ${result.title}`);
          }
        } else if (result.status === 'exists') {
          totalExists++;
        } else if (result.status === 'skipped') {
          totalSkipped++;
        } else if (result.status === 'error') {
          totalErrors++;
        }

        await delay(250);
      }

      await delay(300);
    }

    console.log(`Year ${year} complete. Total saved: ${totalSaved}\n`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ LARGE SEEDING COMPLETE!');
  console.log('='.repeat(60));
  console.log(`📊 Statistics:`);
  console.log(`   ✅ Newly Saved: ${totalSaved}`);
  console.log(`   ♻️  Already Existed: ${totalExists}`);
  console.log(`   ⏭️  Skipped (not movies): ${totalSkipped}`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log(`   📦 Total Unique Movies Processed: ${processedIds.size}`);
  console.log('='.repeat(60));
};

// Run the seeding
seedDatabaseLarge()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Fatal error during seeding:', error);
    process.exit(1);
  });
