import { baseApi } from './baseApi.ts';
import type { MoviesResponse } from '../films/filmsApi.types.ts';

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
    }),
    getAccount: build.query<AccountResponse, { sessionId: string }>({
      query: ({ sessionId }) => ({
        url: '/account',
        params: {
          api_key: apiKey,
          session_id: sessionId,
        },
      }),
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
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const {
  useCreateRequestTokenMutation,
  useCreateSessionMutation,
  useGetAccountQuery,
  useGetAccountFavoritesQuery,
  useMarkFavoriteMutation,
} = authApi;
