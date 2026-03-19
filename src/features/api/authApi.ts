import { baseApi } from './baseApi.ts';
import type { MoviesResponse } from '../films/filmsApi.types.ts';
import {
  accountResponseSchema,
  markFavoriteResponseSchema,
  movieAccountStatesSchema,
  requestTokenResponseSchema,
  sessionResponseSchema,
} from '../auth/authApi.schemas.ts';
import { moviesResponseSchema } from '../films/filmsApi.schemas.ts';
import { parseWithSchema } from '@/common/utils';

type RequestTokenResponse = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

type SessionResponse = {
  success: boolean;
  session_id: string;
};

type AccountResponse = {
  id: number;
  username: string;
  avatar?: {
    gravatar?: {
      hash?: string;
    };
    tmdb?: {
      avatar_path?: string | null;
    };
  };
};
type MovieAccountStatesResponse = {
  id: number;
  favorite: boolean;
  watchlist: boolean;
  rated: { value: number } | false;
};
// логика аутентификации
//  - Header.tsx инициирует flow → authApi.ts запрашивает токен → AuthCallback.tsx создаёт session → authSlice.ts хранит → App.tsx подхватывает account →
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRequestToken: build.mutation<RequestTokenResponse, void>({
      query: () => ({
        url: '/authentication/token/new',
        params: {
          api_key: apiKey,
        },
      }),
      transformResponse: (response: unknown) => parseWithSchema(requestTokenResponseSchema, response),
    }),
    createSession: build.mutation<SessionResponse, { requestToken: string }>({
      query: ({ requestToken }) => ({
        url: '/authentication/session/new',
        method: 'POST',
        params: {
          api_key: apiKey,
        },
        body: {
          request_token: requestToken,
        },
      }),
      transformResponse: (response: unknown) => parseWithSchema(sessionResponseSchema, response),
    }),
    getAccount: build.query<AccountResponse, { sessionId: string }>({
      query: ({ sessionId }) => ({
        url: '/account',
        params: {
          api_key: apiKey,
          session_id: sessionId,
        },
      }),
      transformResponse: (response: unknown) => parseWithSchema(accountResponseSchema, response),
    }),
    getAccountFavorites: build.query<MoviesResponse, { accountId: number; sessionId: string; page?: number }>({
      query: ({ accountId, sessionId, page = 1 }) => ({
        url: `/account/${accountId}/favorite/movies`,
        params: {
          api_key: apiKey,
          session_id: sessionId,
          page,
          language: 'en-US',
          sort_by: 'created_at.desc',
        },
      }),
      providesTags: ['Favorites'],
      transformResponse: (response: unknown) => parseWithSchema(moviesResponseSchema, response),
    }),
    getMovieAccountStates: build.query<MovieAccountStatesResponse, { movieId: number; sessionId: string }>({
      query: ({ movieId, sessionId }) => ({
        url: `/movie/${movieId}/account_states`,
        params: {
          api_key: apiKey,
          session_id: sessionId,
        },
      }),
      providesTags: (_result, _error, arg) => [{ type: 'AccountStates', id: arg.movieId }],
      transformResponse: (response: unknown) => parseWithSchema(movieAccountStatesSchema, response),
    }),
    markFavorite: build.mutation<
      { status_code: number; status_message: string },
      { accountId: number; sessionId: string; mediaId: number; favorite: boolean }
    >({
      query: ({ accountId, sessionId, mediaId, favorite }) => ({
        url: `/account/${accountId}/favorite`,
        method: 'POST',
        params: {
          api_key: apiKey,
          session_id: sessionId,
        },
        body: {
          media_type: 'movie',
          media_id: mediaId,
          favorite,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        'Favorites',
        { type: 'AccountStates', id: arg.mediaId },
      ],
      transformResponse: (response: unknown) => parseWithSchema(markFavoriteResponseSchema, response),
    }),
  }),
});

export const {
  useCreateRequestTokenMutation,
  useCreateSessionMutation,
  useGetAccountQuery,
  useGetAccountFavoritesQuery,
  useGetMovieAccountStatesQuery,
  useMarkFavoriteMutation,
} = authApi;
