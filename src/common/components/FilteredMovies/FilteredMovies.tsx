import s from './filteredMovies.module.css';
import { useAppSelector } from '@/common/hooks/useAppHooks.ts';
import { useFilteredMoviesFilters } from '@/common/hooks/useFilteredMoviesFilters.ts';
import { useFilteredMoviesPagination } from '@/common/hooks/useFilteredMoviesPagination.ts';
import { useFilteredMoviesQuery } from '@/common/hooks/useFilteredMoviesQuery.ts';
import { useInfiniteScroll } from '@/common/hooks/useInfiniteScroll.ts';
import { selectFilteredMovies } from '@/features/selectors.ts';
import FilteredMoviesHeader from './FilteredMoviesHeader.tsx';
import FilteredMoviesSidebar from './FilteredMoviesSidebar.tsx';
import FilteredMoviesResults from './FilteredMoviesResults.tsx';

export const FilteredMovies = () => {
  const { sortBy, ratingRange, debouncedRatingRange, selectedGenres, page, movies } = useAppSelector(selectFilteredMovies);
  const { onSortChange, onRatingChange, onToggleGenre, onReset } = useFilteredMoviesFilters(ratingRange);
  const { data, isFetching, isError } = useFilteredMoviesQuery({
    page,
    sortBy,
    debouncedRatingRange,
    selectedGenres,
  });
  const { hasMore } = useFilteredMoviesPagination({
    sortBy,
    debouncedRatingRange,
    selectedGenres,
    page,
    movies,
    data,
  });
  const { sentinelRef } = useInfiniteScroll({ hasMore, isFetching, page });

  return (
    <section className={s.page}>
      <FilteredMoviesHeader />

      <div className={s.layout}>
        <FilteredMoviesSidebar
          sortBy={sortBy}
          ratingRange={ratingRange}
          selectedGenres={selectedGenres}
          onSortChange={onSortChange}
          onRatingChange={onRatingChange}
          onToggleGenre={onToggleGenre}
          onReset={onReset}
        />

        <FilteredMoviesResults
          movies={movies}
          isFetching={isFetching}
          isError={isError}
          hasMore={hasMore}
          sentinelRef={sentinelRef}
        />
      </div>
    </section>
  );
};

export default FilteredMovies;
