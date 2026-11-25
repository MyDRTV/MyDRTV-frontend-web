import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Genre } from "@/features/genres/types/genre";

const API_URL = process.env.API_URL || "http://localhost:3000";

// Henter alle genrer fra genres-tabellen (GET /genres, kun admin).
export async function getGenres(): Promise<Genre[]> {
  const token = (await cookies()).get("access_token")?.value;

  const response = await fetch(`${API_URL}/genres`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // 401: intet eller udløbet login. Send brugeren til login-siden.
  if (response.status === 401) {
    redirect("/");
  }

  if (!response.ok) {
    throw new Error(`Kunne ikke hente genrer (status ${response.status})`);
  }

  return response.json();
}
