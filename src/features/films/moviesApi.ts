import {baseApi} from "../api/baseApi.ts";
import type {MovieQueryParams, MoviesResponse} from "./filmsApi.types.ts";

export const moviesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularMovies: build.query<MoviesResponse, MovieQueryParams>({
            query: ({language = 'en-US', page = 1, region = 'MD'}) => ({
                url: '/movie/popular',
                params: {
                    language,
                    page,
                    region,
                },
            }),
            serializeQueryArgs: ({endpointName}) => {
                return endpointName;
            },
            // Сливаем новые данные с текущими
            merge: (currentCache, newItems) => {
                currentCache.results.push(...newItems.results);
            },
            // Принудительно делаем запрос, если изменилась страница
            forceRefetch({currentArg, previousArg}) {
                return currentArg?.page !== previousArg?.page;
            },
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
        }),

        fetchSearcheMoviesByTitle: build.query<MoviesResponse, {query: string}>({
            query: ({query}) => ({
                url: '/search/movie',
                params: {
                    query,
                },
            }),
        })
    })
})

export const {useGetPopularMoviesQuery, useGetPopularMoviesBackdropQuery, useLazyGetPopularMoviesQuery, useFetchSearcheMoviesByTitleQuery} = moviesApi;