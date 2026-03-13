import { useEffect, useMemo, useRef } from 'react';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Slider } from '@mui/material';

import s from './filteredMovies.module.css';
import Film from '../Film/Film.tsx';
import { EmptyMoviesState } from '../CategoryMovies/EmptyMoviesState/EmptyMoviesState.tsx';
import { useDiscoverMoviesQuery, useGetMovieGenresQuery } from '@/features/films/moviesApi.ts';
import type { DiscoverMoviesParams } from '@/features/films/filmsApi.types.ts';
import { SORT_OPTIONS } from '@/common/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import {
  appendMovies,
  resetFilters,
  resetPagination,
  setDebouncedRatingRange,
  setMovies,
  setPage,
  setRatingRange,
  setSortBy,
  toggleGenre,
} from '@/features/filteredMovies/filteredMoviesSlice.ts';

export const FilteredMovies = () => {
  const dispatch = useAppDispatch();
  const { sortBy, ratingRange, debouncedRatingRange, selectedGenres, page, movies } = useAppSelector(
    (state) => state.filteredMovies
  );
  // Holds the IntersectionObserver instance for infinite scroll.
  const observerRef = useRef<IntersectionObserver | null>(null);
  // Sentinel element observed at the bottom of the list.
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Fetch genres once to render genre filter buttons.
  const { data: genresData, isLoading: isGenresLoading, isError: isGenresError } = useGetMovieGenresQuery({});

  // Debounce rating changes to avoid sending too many requests.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      dispatch(setDebouncedRatingRange(ratingRange));
    }, 200);

    return () => window.clearTimeout(timer);
  }, [dispatch, ratingRange]);

  // A stable key for "filters changed" detection.
  const filtersKey = useMemo(
    () => `${sortBy}-${debouncedRatingRange.join('-')}-${selectedGenres.join(',')}`,
    [sortBy, debouncedRatingRange, selectedGenres]
  );

  // Reset pagination when filters change.
  useEffect(() => {
    dispatch(resetPagination());
  }, [dispatch, filtersKey]);

  // Build Discover API params from current filters.
  const queryParams: DiscoverMoviesParams = {
    page,
    sort_by: sortBy,
    'vote_average.gte': debouncedRatingRange[0],
    'vote_average.lte': debouncedRatingRange[1],
    ...(selectedGenres.length > 0 ? { with_genres: selectedGenres.join(',') } : {}),
  };

  // Main Discover query for filtered movies.
  const { data, isFetching, isError } = useDiscoverMoviesQuery(queryParams);

  // Merge pages into a single movies list for infinite scroll.
  useEffect(() => {
    if (!data?.results) {
      return;
    }

    if (page === 1) {
      dispatch(setMovies(data.results));
      return;
    }

    const existingIds = new Set(movies.map((movie) => movie.id));
    const next = data.results.filter((movie) => !existingIds.has(movie.id));

    dispatch(appendMovies(next));
  }, [data, dispatch, movies, page]);

  // Handle rating slider changes.
  const handleRatingChange = (_event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      dispatch(setRatingRange([value[0], value[1]]));
    }
  };

  // Reset all filters and results to defaults.
  const handleReset = () => {
    dispatch(resetFilters());
  };

  // Pagination helpers for infinite scroll.
  const totalPages = data?.total_pages ?? 0;
  const hasMore = totalPages > 0 && page < totalPages;

  // Infinite scroll: observe the sentinel and load the next page.
  useEffect(() => {
    if (!hasMore) {
      observerRef.current?.disconnect();
      return;
    }

    if (!sentinelRef.current) {
      return;
    }

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          dispatch(setPage(page + 1));
        }
      },
      { rootMargin: '200px 0px' }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [dispatch, hasMore, isFetching, page]);

  return (
    <section className={s.page}>
      <header className={s.header}>
        <h1>Filtered Movies</h1>
        <p className={s.subtitle}>Combine sorting, rating, and genres to get the exact list you want.</p>
      </header>

      <div className={s.layout}>
        <aside className={s.sidebar}>
          <div className={s.block}>
            <h2>Sorting</h2>
            <FormControl fullWidth size="small">
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                label="Sort by"
                onChange={(event) => dispatch(setSortBy(event.target.value as string))}
              >
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className={s.block}>
            <h2>Rating</h2>
            <div className={s.ratingHeader}>
              <span>
                {ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)}
              </span>
              <span className={s.ratingHint}>Step 0.1</span>
            </div>
            <Slider
              value={ratingRange}
              onChange={handleRatingChange}
              min={0}
              max={10}
              step={0.1}
              valueLabelDisplay="auto"
              disableSwap
            />
          </div>

          <div className={s.block}>
            <div className={s.blockHeader}>
              <h2>Genres</h2>
              {isGenresLoading && <span className={s.loadingText}>Loading...</span>}
            </div>
            {isGenresError && <p className={s.errorText}>Could not load genres.</p>}
            <div className={s.genres}>
              {(genresData?.genres ?? []).map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  className={`${s.genreButton} ${selectedGenres.includes(genre.id) ? s.genreActive : ''}`}
                  onClick={() => dispatch(toggleGenre(genre.id))}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          <Button variant="outlined" onClick={handleReset}>
            Reset filters
          </Button>
        </aside>

        <section className={s.results}>
          {isError && <p className={s.errorText}>Could not load movies. Try adjusting filters.</p>}
          {!isFetching && movies.length === 0 && <EmptyMoviesState />}
          <div className={s.grid}>
            {movies
              .filter((movie) => movie.poster_path !== null)
              .map((movie) => (
                <Film
                  key={movie.id}
                  movieId={movie.id}
                  title={movie.original_title}
                  releaseDate={movie.release_date}
                  voteAverage={movie.vote_average}
                  posterPath={movie.poster_path as string}
                />
              ))}
          </div>
          <div ref={sentinelRef} className={s.sentinel}>
            {hasMore && isFetching && (
              <div className={s.loadingInline}>
                <CircularProgress size={18} color="inherit" />
                <span className={s.loadingText}>Loading...</span>
              </div>
            )}
            {!hasMore && movies.length > 0 && (
              <span className={s.endText}>End of results</span>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default FilteredMovies;
