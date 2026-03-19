import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  error: string | null;
};

const initialState: AppState = {
  error: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearAppError(state) {
      state.error = null;
    },
  },
});

export const { setAppError, clearAppError } = appSlice.actions;
export const appReducer = appSlice.reducer;
