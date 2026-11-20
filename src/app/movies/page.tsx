import Link from "next/link";
import { getMovies } from "@/features/movies/services/movieService";

// Siden venter på filmene fra backenden, før den vises.
// Kræves, fordi cacheComponents er slået til i next.config.ts.
export const instant = false;

export default async function MoviesPage() {
  const movies = await getMovies();

  return (
    <ul className="grid grid-cols-4 gap-8">
      {movies.map((movie) => (
        <li key={movie.movie_pk}>
          <Link href={`/movies/${movie.movie_pk}`}>
            <img src={movie.movie_poster_url} alt={movie.movie_title} />
            <h2>{movie.movie_title}</h2>
            <p>{movie.movie_release_year}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
