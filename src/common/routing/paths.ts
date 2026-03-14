export const Path = {
  Main: '/',
  CategoryMovies: '/categoryMovies',
  FilteredMovies: '/filteredMovies',
  Search: '/search',
  Favorites: '/favorites',
  AuthCallback: '/auth/callback',
  MovieDetails: '/movie/:movieId',
  NotFound: '*',
} as const;

export const moviePagePath = (movieId: number | string) => `/movie/${movieId}`;
