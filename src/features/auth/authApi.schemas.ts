import { z } from 'zod';

export const requestTokenResponseSchema = z.object({
  success: z.boolean(),
  expires_at: z.string(),
  request_token: z.string(),
});

export const sessionResponseSchema = z.object({
  success: z.boolean(),
  session_id: z.string(),
});

export const accountResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  avatar: z
    .object({
      gravatar: z.object({ hash: z.string().optional() }).optional(),
      tmdb: z.object({ avatar_path: z.string().nullable().optional() }).optional(),
    })
    .optional(),
});

export const movieAccountStatesSchema = z.object({
  id: z.number(),
  favorite: z.boolean(),
  watchlist: z.boolean(),
  rated: z.union([z.object({ value: z.number() }), z.literal(false)]),
});

export const markFavoriteResponseSchema = z.object({
  status_code: z.number(),
  status_message: z.string(),
});
