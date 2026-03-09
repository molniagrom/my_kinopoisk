import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { appReducer, appSlice } from "./app-slice.ts"
import { baseApi } from '../features/api/baseApi.ts';
import { moviesSlice } from '../features/films/moviesSlice.ts';

export const store = configureStore({
  reducer: {
    // [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [moviesSlice.name]: moviesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Для доступа к store из консоли во время разработки; это не часть DOM-типов.
// @ts-expect-error store не объявлен в интерфейсе Window, но добавляем его сознательно.
window.store = store;
