/**
 * Description of one object from the film list */
export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
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

export type MovieQueryParams = {
  language?: string;
  page?: number;
  region?: string;
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
