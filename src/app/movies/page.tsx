import MovieList from "@/features/movies/components/MovieList";

export default function MoviesPage({ searchParams }: { searchParams: Promise<{ genre?: string }> }) {
  return <MovieList searchParams={searchParams} />;
}
