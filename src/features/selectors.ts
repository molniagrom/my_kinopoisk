import type { RootState } from '@/app/store.ts';

export const selectFilteredMovies = (state: RootState) => state.filteredMovies;
export const selectThemeMode = (state: RootState) => state.theme.mode;
export const selectAuthSessionId = (state: RootState) => state.auth.sessionId;
export const selectAuthAccountId = (state: RootState) => state.auth.accountId;
export const selectIsAuthorized = (state: RootState) => Boolean(state.auth.sessionId && state.auth.accountId);
