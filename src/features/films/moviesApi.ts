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

export const {useGetPopularMoviesQuery, useFetchSearcheMoviesByTitleQuery} = moviesApi;