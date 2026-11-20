import type { Movie } from "@/features/movies/types/movie";

// Kører på serveren (Server Components), så den kalder backenden direkte.
// I Docker sætter docker-compose API_URL til http://backend:3000.
// Er API_URL ikke sat (eller står den tom i .env), bruges localhost.
const API_URL = process.env.API_URL || "http://localhost:3000";

export async function getMovies(): Promise<Movie[]> {
  const response = await fetch(`${API_URL}/movies`);

  if (!response.ok) {
    throw new Error(`Kunne ikke hente film (status ${response.status})`);
  }

  return response.json();
}
