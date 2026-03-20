import { z } from 'zod';

export const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()).optional(),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const moviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const genreListResponseSchema = z.object({
  genres: z.array(genreSchema),
});

export const movieDetailSchema = movieSchema.extend({
  genres: z.array(genreSchema),
  homepage: z.string().nullable(),
  runtime: z.number().nullable(),
  budget: z.number(),
  revenue: z.number(),
  status: z.string(),
  tagline: z.string().nullable(),
});

export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
  order: z.number(),
});

export const movieCreditsResponseSchema = z.object({
  id: z.number(),
  cast: z.array(castMemberSchema),
});

export const trailerVideoSchema = z.object({
  id: z.string(),
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  key: z.string(),
  name: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
});

export const videosResponseSchema = z.object({
  id: z.number(),
  results: z.array(trailerVideoSchema),
});

export const tvShowSchema = z.object({
  backdrop_path: z.string().nullable(),
  first_air_date: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  name: z.string(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const tvResponseSchema = z.object({
  page: z.number(),
  results: z.array(tvShowSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const watchProviderSchema = z.object({
  provider_id: z.number(),
  provider_name: z.string(),
  logo_path: z.string().nullable().optional(),
  display_priority: z.number().optional(),
  display_priorities: z.record(z.number()).optional(),
});

export const watchProvidersResponseSchema = z.object({
  results: z.array(watchProviderSchema),
});
