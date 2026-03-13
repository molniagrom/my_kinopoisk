import type { DiscoverMoviesParams } from '@/features/films/filmsApi.types.ts';
import { useDiscoverMoviesQuery } from '@/features/films/moviesApi.ts';

type UseFilteredMoviesQueryArgs = {
  page: number;
  sortBy: string;
  debouncedRatingRange: [number, number];
  selectedGenres: number[];
};

export const useFilteredMoviesQuery = ({
  page,
  sortBy,
  debouncedRatingRange,
  selectedGenres,
}: UseFilteredMoviesQueryArgs) => {
  const queryParams: DiscoverMoviesParams = {
    page,
    sort_by: sortBy,
    'vote_average.gte': debouncedRatingRange[0],
    'vote_average.lte': debouncedRatingRange[1],
    ...(selectedGenres.length > 0 ? { with_genres: selectedGenres.join(',') } : {}),
  };

  const { data, isFetching, isError } = useDiscoverMoviesQuery(queryParams);

  return { data, isFetching, isError };
};
