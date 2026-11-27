import MovieSingle from "@/features/movies/components/MovieSingle";

export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  return <MovieSingle params={params} />;
}
