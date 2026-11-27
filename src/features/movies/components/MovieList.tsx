import Link from "next/link";
import { getMovies, getGenres } from "@/features/movies/services/movieService";

// Viser alle film i en liste
export default async function MovieList({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  const { genre: selectedGenre } = await searchParams;
  const [movies, genres] = await Promise.all([getMovies(), getGenres()]);

  // Filtrér på valgt genre
  const shownMovies = selectedGenre
    ? movies.filter((movie) =>
        movie.genres.some((genre) => genre.genre_name === selectedGenre),
      )
    : movies;

  return (
    <div className="flex flex-row gap-12">
      {/*===================================================================
                          VENSTRE KOLONNE MED GENRE 
      ====================================================================*/}
      <div className="w-200">
        <h1>All movies</h1>

        <ul className="flex flex-col gap-2 mt-8">
          <li>
            <Link
              href="/movies"
              className={`transition-opacity hover:opacity-100 ${selectedGenre ? "opacity-60" : ""}`}
            >
              All genres
            </Link>
          </li>
          {genres.map((genre) => (
            <li key={genre.genre_pk}>
              <Link
                // Bruger encodeURIComponent for at sikre, at genrenavne bliver korrekt kodet i URL'en (fx mellemrum i Sci Fi)
                href={`/movies?genre=${encodeURIComponent(genre.genre_name)}`}
                className={`transition-opacity hover:opacity-100 ${genre.genre_name === selectedGenre ? "" : "opacity-60"}`}
              >
                {genre.genre_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/*===================================================================
                            HØJRE KOLONNE MED FILM 
      ====================================================================*/}
      <ul className="grid grid-cols-3 gap-8">
        {shownMovies.map((movie) => (
          <li key={movie.movie_pk}>
            <Link
              href={`/movies/${movie.movie_pk}`}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-400"
            >
              <img src={movie.movie_poster_url} alt={movie.movie_title} />
              <div className="flex flex-col gap-1 p-3">
                <p className="opacity-60">
                  {movie.genres.map((genre) => genre.genre_name).join(", ")}
                </p>
                <h3>{movie.movie_title}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
