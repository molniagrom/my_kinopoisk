/**
 * Description of one object from the film list */
export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

/**
 * Description of the server root response */
export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type GenreListResponse = {
  genres: Genre[];
};

export type MovieQueryParams = {
  language?: string;
  page?: number;
  region?: string;
};

export type DiscoverMoviesParams = {
  language?: string;
  page?: number;
  region?: string;
  sort_by?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  with_genres?: string;
  with_watch_providers?: string;
  watch_region?: string;
  with_watch_monetization_types?: string;
  with_release_type?: string;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  include_video?: boolean;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieDetail = Movie & {
  genres: Genre[];
  homepage: string | null;
  runtime: number | null;
  budget: number;
  revenue: number;
  status: string;
  tagline: string | null;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

export type MovieCreditsResponse = {
  id: number;
  cast: CastMember[];
};

export type TrailerVideo = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
};

export type VideosResponse = {
  id: number;
  results: TrailerVideo[];
};

export type TvShow = {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
};

export type TvResponse = {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
};

export type TvQueryParams = {
  language?: string;
  page?: number;
};

export type WatchProvider = {
  provider_id: number;
  provider_name: string;
  logo_path?: string | null;
  display_priority?: number;
  display_priorities?: Record<string, number>;
};

export type WatchProvidersResponse = {
  results: WatchProvider[];
};
