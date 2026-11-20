import { getMovies } from "@/features/movies/services/movieService";

// Siden venter på filmene fra backenden, før den vises.
// Kræves, fordi cacheComponents er slået til i next.config.ts.
export const instant = false;

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movies = await getMovies();
  const movie = movies.find((movie) => movie.movie_pk === id);

  if (!movie) {
    return <p>Filmen findes ikke</p>;
  }

  return (
    <article>
      <img src={movie.movie_poster_url} alt={movie.movie_title} />
      <h1>{movie.movie_title}</h1>
      <p>{movie.movie_release_year}</p>
      <p>{movie.movie_description}</p>
    </article>
  );
}
