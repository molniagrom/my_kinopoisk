import type { RefObject } from 'react';
import { CircularProgress } from '@mui/material';

import s from './filteredMovies.module.css';
import MovieCard from '../MovieCard.tsx';
import { EmptyMoviesState } from '../CategoryMovies/EmptyMoviesState/EmptyMoviesState.tsx';
import type { Movie } from '@/features/films/filmsApi.types.ts';
import MovieCardSkeleton from '../Skeletons/MovieCardSkeleton.tsx';

type FilteredMoviesResultsProps = {
  movies: Movie[];
  isFetching: boolean;
  isError: boolean;
  hasMore: boolean;
  sentinelRef: RefObject<HTMLDivElement>;
};

const FilteredMoviesResults = (
    { movies, isFetching, isError, hasMore, sentinelRef }: FilteredMoviesResultsProps) => (
  <section className={s.results}>
    {isError && <p className={s.errorText}>Could not load movies. Try adjusting filters.</p>}
    {!isFetching && movies.length === 0 && <EmptyMoviesState />}
    <div className={s.grid}>
      {isFetching && movies.length === 0
        ? Array.from({ length: 8 }).map((_, index) => <MovieCardSkeleton key={`skeleton-${index}`} />)
        : null}
      {movies
        .filter((movie) => movie.poster_path !== null)
        .map((movie) => (
          <MovieCard
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
      {!hasMore && movies.length > 0 && <span className={s.endText}>End of results</span>}
    </div>
  </section>
);

export default FilteredMoviesResults;

