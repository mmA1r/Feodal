import { createSlice } from "@reduxjs/toolkit";

export const gameOver = createSlice({
    name: 'gameOver',
    initialState: {
        gameIsOver: false
    },
    reducers: {
        gameIsOver: (state, action) => {
            state.gameIsOver = action.payload;
        }
    }
});

export const { gameIsOver } = gameOver.actions;

export default gameOver.reducer;