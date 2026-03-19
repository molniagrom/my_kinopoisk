import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { appReducer, appSlice } from "./app-slice.ts"
import { baseApi } from '../features/api/baseApi.ts';
import { moviesSlice } from '../features/films/moviesSlice.ts';
import { themeReducer, type ThemeMode } from '../features/theme/themeSlice.ts';
import { filteredMoviesReducer } from '../features/filteredMovies/filteredMoviesSlice.ts';
import { THEME_STORAGE_KEY } from '../common/constants';

const getInitialThemeMode = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'dark';
};

const preloadedState = {
  theme: {
    mode: getInitialThemeMode(),
  },
};
import { authReducer } from '../features/auth/authSlice.ts';

export const store = configureStore({
  preloadedState,
  reducer: {
    // [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [moviesSlice.name]: moviesSlice.reducer,
    theme: themeReducer,
    filteredMovies: filteredMoviesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Для доступа к store из консоли во время разработки; это не часть DOM-типов.
// @ts-expect-error store не объявлен в интерфейсе Window, но добавляем его сознательно.
window.store = store;
