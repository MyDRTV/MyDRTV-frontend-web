"use server";

import { apiFetch } from "@/lib/api";

export type CreateMovieState = { error?: string; success?: string };

export async function createMovie(
  _prev: CreateMovieState,
  formData: FormData,
): Promise<CreateMovieState> {
  const response = await apiFetch("/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: formData.get("title"),
      release_year: Number(formData.get("release_year")),
      genre: formData.get("genre"),
      description: formData.get("description"),
      poster_url: formData.get("poster_url"),
    }),
  });

  if (!response.ok) {
    return { error: `Couldn't create movie (status ${response.status})` };
  }

  return { success: "Movie created successfully" };
}
