import type { RootState } from '@/app/store.ts';
import { baseApi } from '@/features/api/baseApi.ts';

export const selectFilteredMovies = (state: RootState) => state.filteredMovies;
export const selectThemeMode = (state: RootState) => state.theme.mode;
export const selectAuthSessionId = (state: RootState) => state.auth.sessionId;
export const selectAuthAccountId = (state: RootState) => state.auth.accountId;
export const selectIsAuthorized = (state: RootState) => Boolean(state.auth.sessionId && state.auth.accountId);
export const selectAppError = (state: RootState) => state.app.error;
export const selectIsRequesting = (state: RootState) => {
  const apiState = state[baseApi.reducerPath];
  if (!apiState) {
    return false;
  }

  const isQueryLoading = Object.values(apiState.queries).some((query) => query?.status === 'pending');
  const isMutationLoading = Object.values(apiState.mutations).some((mutation) => mutation?.status === 'pending');
  return isQueryLoading || isMutationLoading;
};
