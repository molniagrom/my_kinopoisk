import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { AUTH_TOKEN } from '@/common/constants';

type AuthState = {
  sessionId: string | null;
  accountId: number | null;
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
      window.localStorage.removeItem(AUTH_TOKEN);
    },
    setAccountId(state, action: PayloadAction<number>) {
      state.accountId = action.payload;
    },
  },
});

export const { setSessionId, clearSession, setAccountId } = authSlice.actions;

export const authReducer = authSlice.reducer;
