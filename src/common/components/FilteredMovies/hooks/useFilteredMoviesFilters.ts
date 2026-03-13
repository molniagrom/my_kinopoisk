import { useEffect } from 'react';

import { useAppDispatch } from '@/app/hooks.ts';
import {
  resetFilters,
  setDebouncedRatingRange,
  setRatingRange,
  setSortBy,
  toggleGenre,
} from '@/features/filteredMovies/filteredMoviesSlice.ts';

export const useFilteredMoviesFilters = (ratingRange: [number, number]) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      dispatch(setDebouncedRatingRange(ratingRange));
    }, 200);

    return () => window.clearTimeout(timer);
  }, [dispatch, ratingRange]);

  const onSortChange = (value: string) => {
    dispatch(setSortBy(value));
  };

  const onRatingChange = (_event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      dispatch(setRatingRange([value[0], value[1]]));
    }
  };

  const onToggleGenre = (genreId: number) => {
    dispatch(toggleGenre(genreId));
  };

  const onReset = () => {
    dispatch(resetFilters());
  };

  return {
    onSortChange,
    onRatingChange,
    onToggleGenre,
    onReset,
  };
};
