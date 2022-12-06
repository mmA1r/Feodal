import { createSlice } from "@reduxjs/toolkit";

export const enemyCastle = createSlice({
    name: 'enemyCastle',
    initialState: {
        currentHp: 0,
        fullHp: 0,
        armyLength: 0,
        castleLevel: 1,
    },
    reducers: {
        castleValues: (state, action) => {
            if('fullHp' in action.payload) {
                state.fullHp = action.payload.fullHp;
            }
            if('currentHp' in action.payload) {
                state.currentHp = action.payload.currentHp;
            }
            if('castleLevel' in action.payload) {
                state.castleLevel = action.payload.castleLevel;
            }
            if('armyLength' in action.payload) {
                state.armyLength = action.payload.armyLength;
            }
        }
    }
});

export const { castleValues } = enemyCastle.actions;

export default enemyCastle.reducer;