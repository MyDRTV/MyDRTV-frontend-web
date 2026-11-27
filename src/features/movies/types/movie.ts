export type Genre = {
  genre_pk: string;
  genre_name: string;
};

export type Movie = {
  movie_pk: string;
  movie_title: string;
  movie_release_year: string;
  movie_description: string;
  movie_poster_url: string;
  genres: Genre[];
};
