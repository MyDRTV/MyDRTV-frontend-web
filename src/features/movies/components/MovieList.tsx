import Link from "next/link";
import type { Movie } from "@/features/movies/types/movie";
import type { Genre } from "@/features/genres/types/genre";

// Viser alle film i et gitter. Siden henter filmene og sender dem med som props.
export default function MovieList({
  movies,
  genres,
  selectedGenre,
}: {
  movies: Movie[];
  genres: Genre[];
  selectedGenre?: string;
}) {
  // Er en genre valgt, vises kun de film, der har den genre.
  const shownMovies = selectedGenre
    ? movies.filter((movie) =>
        movie.genres.some((genre) => genre.genre_name === selectedGenre),
      )
    : movies;

  return (
    <div className="flex flex-row gap-12">
      <div className="min-w-sm">
        <h1>All movies</h1>

        <ul className="flex flex-col gap-2 mt-8">
          <li>
            <Link
              href="/movies"
              className={selectedGenre ? "opacity-60" : "font-semibold"}
            >
              All genres
            </Link>
          </li>
          {genres.map((genre) => (
            <li key={genre.genre_pk}>
              <Link
                href={`/movies?genre=${encodeURIComponent(genre.genre_name)}`}
                className={
                  genre.genre_name === selectedGenre
                    ? "font-semibold"
                    : "opacity-60"
                }
              >
                {genre.genre_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="grid grid-cols-3 gap-12">
        {shownMovies.map((movie) => (
          <li key={movie.movie_pk}>
            <Link
              href={`/movies/${movie.movie_pk}`}
              className="flex flex-col gap-1"
            >
              <img
                src={movie.movie_poster_url}
                alt={movie.movie_title}
                className="rounded-lg"
              />
              <p className="opacity-60">
                {movie.genres.map((genre) => genre.genre_name).join(", ")}
              </p>
              <h2>{movie.movie_title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
