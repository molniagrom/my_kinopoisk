import { baseApi } from '../api/baseApi.ts';
import type {
  DiscoverMoviesParams,
  GenreListResponse,
  MovieCreditsResponse,
  MovieDetail,
  MovieQueryParams,
  MoviesResponse,
} from './filmsApi.types.ts';
import {
  genreListResponseSchema,
  movieCreditsResponseSchema,
  movieDetailSchema,
  moviesResponseSchema,
} from './filmsApi.schemas.ts';
import { parseWithSchema } from '@/common/utils';

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopularMovies: build.query<MoviesResponse, MovieQueryParams>({
      query: ({ language = 'en-US', page = 1, region = 'US' }) => ({
        url: '/movie/popular',
        params: {
          language,
          page,
          region,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Сливаем новые данные с текущими
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      // Принудительно делаем запрос, если изменилась страница
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      transformResponse: (response: unknown) => parseWithSchema(moviesResponseSchema, response),
    }),
    getTopRatedMovies: build.query<MoviesResponse, MovieQueryParams>({
      query: ({ language = 'en-US', page = 1, region = 'US' }) => ({
        url: '/movie/top_rated',
        params: {
          language,
          page,
          region,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      transformResponse: (response: unknown) => parseWithSchema(moviesResponseSchema, response),
    }),
    getNowPlayingMovies: build.query<MoviesResponse, MovieQueryParams>({
      query: ({ language = 'en-US', page = 1, region = 'US' }) => ({
        url: '/movie/now_playing',
        params: {
          language,
          page,
          region,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      transformResponse: (response: unknown) => parseWithSchema(moviesResponseSchema, response),
    }),
    getUpcomingMovies: build.query<MoviesResponse, MovieQueryParams>({
      query: ({ language = 'en-US', page = 1, region = 'US' }) => ({
        url: '/movie/upcoming',
        params: {
          language,
          page,
          region,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      transformResponse: (response: unknown) => parseWithSchema(moviesResponseSchema, response),
    }),

    getPopularMoviesBackdrop: build.query<MoviesResponse, void>({
      query: () => ({
        url: '/movie/popular',
        params: {
          language: 'en-US',
          page: 1,
          region: 'US',
        },
      }),
      transformResponse: (response: unknown) => parseWithSchema(moviesResponseSchema, response),
    }),

    fetchSearcheMoviesByTitle: build.query<MoviesResponse, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '/search/movie',
        params: {
          query,
          page,
        },
      }),
      transformResponse: (response: unknown) => parseWithSchema(moviesResponseSchema, response),
    }),

    getMovieById: build.query<MovieDetail, { movieId: number; language?: string }>({
      query: ({ movieId, language = 'en-US' }) => ({
        url: `/movie/${movieId}`,
        params: {
          language,
        },
      }),
      keepUnusedDataFor: 60,
      transformResponse: (response: unknown) => parseWithSchema(movieDetailSchema, response),
    }),
    getMovieCredits: build.query<MovieCreditsResponse, { movieId: number; language?: string }>({
      query: ({ movieId, language = 'en-US' }) => ({
        url: `/movie/${movieId}/credits`,
        params: {
          language,
        },
      }),
      transformResponse: (response: unknown) => parseWithSchema(movieCreditsResponseSchema, response),
    }),
    getSimilarMovies: build.query<MoviesResponse, { movieId: number; language?: string; page?: number }>({
      query: ({ movieId, language = 'en-US', page = 1 }) => ({
        url: `/movie/${movieId}/similar`,
        params: {
          language,
          page,
        },
      }),
      transformResponse: (response: unknown) => parseWithSchema(moviesResponseSchema, response),
    }),

    getMovieGenres: build.query<GenreListResponse, { language?: string }>({
      query: ({ language = 'en-US' }) => ({
        url: '/genre/movie/list',
        params: {
          language,
        },
      }),
      transformResponse: (response: unknown) => parseWithSchema(genreListResponseSchema, response),
    }),

    discoverMovies: build.query<MoviesResponse, DiscoverMoviesParams>({
      query: ({
        language = 'en-US',
        page = 1,
        region = 'US',
        sort_by = 'popularity.desc',
        'vote_average.gte': voteAverageGte = 0,
        'vote_average.lte': voteAverageLte = 10,
        with_genres,
      }) => ({
        url: '/discover/movie',
        params: {
          language,
          page,
          region,
          sort_by,
          'vote_average.gte': voteAverageGte,
          'vote_average.lte': voteAverageLte,
          with_genres,
        },
      }),
      transformResponse: (response: unknown) => parseWithSchema(moviesResponseSchema, response),
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetPopularMoviesBackdropQuery,
  useFetchSearcheMoviesByTitleQuery,
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useGetMovieGenresQuery,
  useDiscoverMoviesQuery,
} = moviesApi;
