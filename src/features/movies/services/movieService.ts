import { apiFetch } from "@/lib/api";
import type { Movie, Genre } from "@/features/movies/types/movie";

export async function getMovies(): Promise<Movie[]> {
  const response = await apiFetch("/movies");
  if (!response.ok) throw new Error(`Kunne ikke hente film (status ${response.status})`);
  return response.json();
}

// Giver undefined, hvis filmen ikke findes.
export async function getMovie(id: string): Promise<Movie | undefined> {
  const response = await apiFetch(`/movies/${id}`);
  if (!response.ok) return undefined;
  return response.json();
}

export async function getGenres(): Promise<Genre[]> {
  const response = await apiFetch("/genres");
  if (!response.ok) throw new Error(`Kunne ikke hente genrer (status ${response.status})`);
  return response.json();
}
