import { createSlice } from "@reduxjs/toolkit";

export const hoverHint = createSlice({
    name: 'hoverHint',
    initialState: {
        state: false,
        type: null,
        top: 2000,
        left: 0
    },
    reducers: {
        hintValues: (state, action) => {
            if('state' in action.payload) {
                state.state = action.payload.state;
            }
            if('type' in action.payload) {
                state.type = action.payload.type;
            }
            if('top' in action.payload) {
                state.top = action.payload.top;
            }
            if('left' in action.payload) {
                state.left = action.payload.left;
            }
        }
    }
});

export const { hintValues } = hoverHint.actions;

export default hoverHint.reducer;