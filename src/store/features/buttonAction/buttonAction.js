import { createSlice } from "@reduxjs/toolkit";

export const action = createSlice({
    name: 'action',
    initialState: {
        inactive: true,
        stop: false,
        attack: false,
        move: false,
    },
    reducers: {
        buttonAction: (state, action) => {
            if(action.payload === 'inactive') {
                state.stop = state.attack = state.move = false;
                state.inactive = true;
            }
            if(action.payload === 'stop') {
                state.inactive = state.attack = state.move = false;
                state.stop = true
            }
            if(action.payload === 'attack') {
                state.inactive = state.stop = state.move = false;
                state.attack = true;
            }
            if(action.payload === 'move') {
                state.inactive = state.attack = state.stop = false;
                state.move = true
            }
        }
    }
});

export const { buttonAction } = action.actions;

export default action.reducer;