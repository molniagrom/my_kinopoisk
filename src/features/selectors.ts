import type { RootState } from '@/app/store.ts';

export const selectFilteredMovies = (state: RootState) => state.filteredMovies;
export const selectThemeMode = (state: RootState) => state.theme.mode;
