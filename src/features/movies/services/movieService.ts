import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Movie } from "@/features/movies/types/movie";

// Kører på serveren (Server Components), så den kalder backenden direkte.
// I Docker sætter docker-compose API_URL til http://backend:3000.
// Er API_URL ikke sat (eller står den tom i .env), bruges localhost.
const API_URL = process.env.API_URL || "http://localhost:3000";

export async function getMovies(): Promise<Movie[]> {
  // Backenden kræver et JWT. Det ligger i den cookie, login-action'en satte.
  const token = (await cookies()).get("access_token")?.value;

  const response = await fetch(`${API_URL}/movies`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // 401: intet eller udløbet login. Send brugeren til login-siden.
  if (response.status === 401) {
    redirect("/");
  }

  if (!response.ok) {
    throw new Error(`Kunne ikke hente film (status ${response.status})`);
  }

  return response.json();
}
