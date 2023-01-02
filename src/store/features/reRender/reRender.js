import { createSlice } from "@reduxjs/toolkit";

export const reRender = createSlice({
    name: 'reRender',
    initialState: {
        value: 0
    },
    reducers: {
        incValue: (state, action) => {
            state.value += action.payload;
        }
    }
});

export const { incValue } = reRender.actions;

export default reRender.reducer;