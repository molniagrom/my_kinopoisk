import type {Movie} from "./filmsApi.types.ts";

export type MoviesSliceType = {
    popularMovies: Movie[],
    visibleCount: number,
    apiPage: number
}