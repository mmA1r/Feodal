import { createSlice } from "@reduxjs/toolkit";

export const gamerStore = createSlice({
    name: 'gamer',
    initialState: {
        level: 1,
        hp: 0,
        money: 0,
        units: []
    },
    reducers: {
        gamer: (state, action) => {
            if(action.level) {
                state.level = action.payload.level;
            }
            if(action.hp) {
                state.hp = action.payload.hp;
            }
            if(action.money) {
                state.money = action.payload.money;
            }
            if(action.units) {
                state.units = action.payload.units
            }
        }
    }
});

export const { gamer } = gamerStore.actions;

export default gamerStore.reducer;