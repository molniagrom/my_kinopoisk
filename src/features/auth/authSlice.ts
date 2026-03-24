import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { AUTH_TOKEN } from '@/common/constants';

type AuthState = {
  sessionId: string | null;
  accountId: number | null;
  favoriteIds: number[];
};

const getStoredSessionId = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN);
};

const initialState: AuthState = {
  sessionId: getStoredSessionId(),
  accountId: null,
  favoriteIds: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSessionId(state, action: PayloadAction<string>) {
      state.sessionId = action.payload;
      window.localStorage.setItem(AUTH_TOKEN, action.payload);
    },
    clearSession(state) {
      state.sessionId = null;
      state.accountId = null;
      state.favoriteIds = [];
      window.localStorage.removeItem(AUTH_TOKEN);
    },
    setAccountId(state, action: PayloadAction<number>) {
      state.accountId = action.payload;
    },
    setFavoriteIds(state, action: PayloadAction<number[]>) {
      state.favoriteIds = action.payload;
    },
    setFavoriteStatus(state, action: PayloadAction<{ movieId: number; favorite: boolean }>) {
      const { movieId, favorite } = action.payload;
      if (favorite) {
        if (!state.favoriteIds.includes(movieId)) {
          state.favoriteIds.push(movieId);
        }
        return;
      }

      state.favoriteIds = state.favoriteIds.filter((id) => id !== movieId);
    },
  },
});

export const { setSessionId, clearSession, setAccountId, setFavoriteIds, setFavoriteStatus } = authSlice.actions;

export const authReducer = authSlice.reducer;
