import MovieList from "@/features/movies/components/MovieList";
import { getMovies } from "@/features/movies/services/movieService";
import { getGenres } from "@/features/genres/services/genreService";

// Siden venter på filmene fra backenden, før den vises.
// Kræves, fordi cacheComponents er slået til i next.config.ts.
export const instant = false;

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  // ?genre=Drama i adressen bestemmer, hvilken genre der er valgt.
  const { genre } = await searchParams;
  // Film og genrer hentes samtidig.
  const [movies, genres] = await Promise.all([getMovies(), getGenres()]);

  return <MovieList movies={movies} genres={genres} selectedGenre={genre} />;
}
