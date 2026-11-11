// Adressen til backenden.
// - I browseren: "/api" (nginx på serveren, rewrite i next.config lokalt).
// - På serveren (Server Components, route handlers): direkte til backenden,
//   fordi relative adresser ikke virker uden en browser.
export const API_URL =
  typeof window === "undefined"
    ? (process.env.API_URL ?? "http://localhost:3000")
    : "/api";

// Brug: const movies = await api<Movie[]>("/movies");
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, init);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${path}`);
  return res.json() as Promise<T>;
}
