import { useEffect, useMemo, useRef } from 'react';

import { useAppDispatch } from '@/common/hooks/useAppHooks.ts';
import type { Movie, MoviesResponse } from '@/features/films/filmsApi.types.ts';
import { appendMovies, resetPagination, setMovies } from '@/features/filteredMovies/filteredMoviesSlice.ts';

type UseFilteredMoviesPaginationArgs = {
  sortBy: string;
  debouncedRatingRange: [number, number];
  selectedGenres: number[];
  page: number;
  movies: Movie[];
  data?: MoviesResponse;
};

export const useFilteredMoviesPagination = ({
  sortBy,
  debouncedRatingRange,
  selectedGenres,
  page,
  movies,
  data,
}: UseFilteredMoviesPaginationArgs) => {
  const dispatch = useAppDispatch();
  const moviesRef = useRef<Movie[]>([]);

  useEffect(() => {
    moviesRef.current = movies;
  }, [movies]);

  const filtersKey = useMemo(
    () => `${sortBy}-${debouncedRatingRange.join('-')}-${selectedGenres.join(',')}`,
    [sortBy, debouncedRatingRange, selectedGenres]
  );

  useEffect(() => {
    dispatch(resetPagination());
  }, [dispatch, filtersKey]);

  useEffect(() => {
    if (!data?.results) {
      return;
    }

    if (page === 1) {
      dispatch(setMovies(data.results));
      return;
    }

    const existingIds = new Set(moviesRef.current.map((movie) => movie.id));
    const next = data.results.filter((movie) => !existingIds.has(movie.id));

    if (next.length > 0) {
      dispatch(appendMovies(next));
    }
  }, [data, dispatch, page]);

  const totalPages = data?.total_pages ?? 0;
  const hasMore = totalPages > 0 && page < totalPages;

  return { hasMore };
};
