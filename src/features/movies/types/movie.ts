import type { Genre } from "@/features/genres/types/genre";

export type Movie = {
  movie_pk: string;
  movie_title: string;
  movie_release_year: string;
  movie_description: string;
  movie_poster_url: string;
  genres: Genre[];
};
