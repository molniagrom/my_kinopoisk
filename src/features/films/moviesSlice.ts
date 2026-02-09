import {createSlice} from "@reduxjs/toolkit";
import type {MoviesSliceType} from "./moviesSlice.types.ts";

const initialState: MoviesSliceType = {
    popularMovies: [],
    visibleCount: 6,
    apiPage: 1,
}

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = [...state.popularMovies, ...action.payload];
        },
        clearPopularMovies: (state) => {
            state.popularMovies = [];
        },
        setApiPage: (state, action) => {
            state.apiPage = action.payload;
        },
        setVisibleCount: (state, action) => {
            state.visibleCount = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const { setPopularMovies, addPopularMovies, clearPopularMovies, setApiPage, setVisibleCount } = moviesSlice.actions;

export default moviesSlice.reducer;