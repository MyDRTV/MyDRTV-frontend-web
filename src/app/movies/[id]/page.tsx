import MovieSingle from "@/features/movies/components/MovieSingle";
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

  return <MovieSingle movie={movie} />;
}
