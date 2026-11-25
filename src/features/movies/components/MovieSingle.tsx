import type { Movie } from "@/features/movies/types/movie";

// Viser én film. Siden finder filmen og sender den med som props.
export default function MovieSingle({ movie }: { movie: Movie }) {
  return (
    <article className="flex flex-row gap-12">
      <img
        src={movie.movie_poster_url}
        alt={movie.movie_title}
        className="w-100 rounded-lg"
      />
      <div className="flex flex-col gap-2 pt-6">
        <h1>{movie.movie_title}</h1>
        <div className="flex flex-row gap-4 opacity-60">
          <p>{movie.movie_release_year}</p>
          <span>–</span>
          <p>{movie.genres?.map((genre) => genre.genre_name).join(", ")}</p>
        </div>
        <p className="pt-8">{movie.movie_description}</p>
      </div>
    </article>
  );
}
