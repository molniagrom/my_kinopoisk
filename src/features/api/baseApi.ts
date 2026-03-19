import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setAppError } from '@/app/appSlice.ts';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    // VITE_ACCESS_TOKEN должен содержать ваш токен доступа (v4 auth), а не API ключ.
    const token = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
    headers.set('Authorization', `Bearer ${token}`);
  },
});

const getErrorMessage = (error: FetchBaseQueryError) => {
  if (typeof error.status === 'string') {
    if (error.status === 'FETCH_ERROR') {
      return 'Network error. Please check your internet connection.';
    }
    return error.error ?? 'Network error. Please try again.';
  }

  if (error.status === 403) {
    return '403 Forbidden Error. Check API-KEY.';
  }

  if (error.status === 401) {
    return 'Unauthorized. Please check your credentials.';
  }

  if (error.status >= 500) {
    return 'Server error occurred. Please try again later.';
  }

  if (typeof error.data === 'object' && error.data !== null && 'status_message' in error.data) {
    return String((error.data as { status_message?: string }).status_message);
  }

  return 'Something went wrong. Please try again.';
};

const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    api.dispatch(setAppError(getErrorMessage(result.error)));
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'filmsApi',
  tagTypes: ['Favorites', 'AccountStates'],
  refetchOnReconnect: true,
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}),
});
