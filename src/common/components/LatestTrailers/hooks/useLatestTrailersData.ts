import { useMemo } from 'react';
import {
  useDiscoverMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTvOnTheAirQuery,
} from '@/features/films/moviesApi.ts';
import { defaultLanguage, defaultRegion } from '../constants.ts';
import { buildReleaseRange } from '../utils.ts';
import { useProviderIds } from './useProviderIds.ts';
import type { LatestTrailerItem } from '../types.ts';

export const useLatestTrailersData = (activeTab: string) => {
  const { streamingProviderIds, rentProviderIds, isFetching: isProvidersFetching } = useProviderIds();

  const { data: popularMovies, isFetching: isPopularFetching } = useGetPopularMoviesQuery({
    page: 1,
    language: defaultLanguage,
    region: defaultRegion,
  });
  const { data: tvOnTheAir, isFetching: isTvFetching } = useGetTvOnTheAirQuery({
    page: 1,
    language: defaultLanguage,
  });

  const { start: releaseStart, end: releaseEnd } = useMemo(() => buildReleaseRange(60), []);

  const { data: streamingMovies, isFetching: isStreamingFetching } = useDiscoverMoviesQuery({
    language: defaultLanguage,
    region: defaultRegion,
    watch_region: defaultRegion,
    with_watch_providers: streamingProviderIds || undefined,
    with_watch_monetization_types: 'flatrate|free|ads',
    sort_by: 'popularity.desc',
    include_video: true,
    page: 1,
  });
  const { data: rentMovies, isFetching: isRentFetching } = useDiscoverMoviesQuery({
    language: defaultLanguage,
    region: defaultRegion,
    watch_region: defaultRegion,
    with_watch_providers: rentProviderIds || undefined,
    with_watch_monetization_types: 'rent',
    sort_by: 'popularity.desc',
    include_video: true,
    page: 1,
  });
  const { data: inTheatersMovies, isFetching: isInTheatersFetching } = useDiscoverMoviesQuery({
    language: defaultLanguage,
    region: defaultRegion,
    sort_by: 'release_date.desc',
    with_release_type: '2',
    'primary_release_date.gte': releaseStart,
    'primary_release_date.lte': releaseEnd,
    include_video: true,
    page: 1,
  });

  const items: LatestTrailerItem[] = useMemo(() => {
    if (activeTab === 'Popular') {
      return (popularMovies?.results ?? []).map((movie) => ({
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        mediaType: 'movie',
      }));
    }
    if (activeTab === 'Streaming') {
      return (streamingMovies?.results ?? []).map((movie) => ({
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        mediaType: 'movie',
      }));
    }
    if (activeTab === 'On TV') {
      return (tvOnTheAir?.results ?? []).map((show) => ({
        id: show.id,
        title: show.name,
        backdrop_path: show.backdrop_path,
        mediaType: 'tv',
      }));
    }
    if (activeTab === 'For Rent') {
      return (rentMovies?.results ?? []).map((movie) => ({
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        mediaType: 'movie',
      }));
    }
    return (inTheatersMovies?.results ?? []).map((movie) => ({
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      mediaType: 'movie',
    }));
  }, [activeTab, popularMovies, streamingMovies, tvOnTheAir, rentMovies, inTheatersMovies]);

  const isLoading =
    isPopularFetching ||
    isTvFetching ||
    isProvidersFetching ||
    isStreamingFetching ||
    isRentFetching ||
    isInTheatersFetching;

  return { items, isLoading };
};
