export const Path = {
  Main: '/',
  CategoryMovies: '/categoryMovies',
  FilteredMovies: '/filteredMovies',
  Search: '/search',
  Favorites: '/favorites',
  MovieDetails: '/movie/:movieId',
  NotFound: '*',
} as const;

export const moviePagePath = (movieId: number | string) => `/movie/${movieId}`;
