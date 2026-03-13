import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../films/filmsApi.types.ts';
import { FILTERED_DEFAULT_RATING, FILTERED_DEFAULT_SORT } from '@/common/constants';

type RatingRange = [number, number];

export type FilteredMoviesState = {
  sortBy: string;
  ratingRange: RatingRange;
  debouncedRatingRange: RatingRange;
  selectedGenres: number[];
  page: number;
  movies: Movie[];
};

const initialState: FilteredMoviesState = {
  sortBy: FILTERED_DEFAULT_SORT,
  ratingRange: FILTERED_DEFAULT_RATING,
  debouncedRatingRange: FILTERED_DEFAULT_RATING,
  selectedGenres: [],
  page: 1,
  movies: [],
};

export const filteredMoviesSlice = createSlice({
  name: 'filteredMovies',
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setRatingRange(state, action: PayloadAction<RatingRange>) {
      state.ratingRange = action.payload;
    },
    setDebouncedRatingRange(state, action: PayloadAction<RatingRange>) {
      state.debouncedRatingRange = action.payload;
    },
    toggleGenre(state, action: PayloadAction<number>) {
      const genreId = action.payload;
      state.selectedGenres = state.selectedGenres.includes(genreId)
        ? state.selectedGenres.filter((id) => id !== genreId)
        : [...state.selectedGenres, genreId];
    },
    clearGenres(state) {
      state.selectedGenres = [];
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetFilters(state) {
      state.sortBy = FILTERED_DEFAULT_SORT;
      state.ratingRange = FILTERED_DEFAULT_RATING;
      state.debouncedRatingRange = FILTERED_DEFAULT_RATING;
      state.selectedGenres = [];
      state.page = 1;
      state.movies = [];
    },
    resetPagination(state) {
      state.page = 1;
      state.movies = [];
    },
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    appendMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = [...state.movies, ...action.payload];
    },
    clearMovies(state) {
      state.movies = [];
    },
  },
});

export const {
  setSortBy,
  setRatingRange,
  setDebouncedRatingRange,
  toggleGenre,
  clearGenres,
  setPage,
  resetFilters,
  resetPagination,
  setMovies,
  appendMovies,
  clearMovies,
} = filteredMoviesSlice.actions;

export const filteredMoviesReducer = filteredMoviesSlice.reducer;
