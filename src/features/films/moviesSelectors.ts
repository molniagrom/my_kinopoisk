import type { MoviesSliceType } from "./moviesSlice.types.ts";

export const selectPopularMovies = (state: { movies: MoviesSliceType }) => state.movies.popularMovies;
export const selectPopularMoviesCount = (state: { movies: MoviesSliceType }) => state.movies.popularMovies.length;
export const selectApiPage = (state: { movies: MoviesSliceType }) => state.movies.apiPage;
export const selectVisibleCount = (state: { movies: MoviesSliceType }) => state.movies.visibleCount;