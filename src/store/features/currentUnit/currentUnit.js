import { createSlice } from "@reduxjs/toolkit";

export const unit = createSlice({
    name: 'unit',
    initialState: {
        hp: 100,
        type: 1,
        level: 1
    },
    reducers: {
        currentUnit: (state, action) => {
            if('hp' in action.payload) {
                state.hp = action.payload.hp;
            }
            if('type' in action.payload) {
                state.type = action.payload.type;
            }
            if('level' in action.payload) {
                state.level = action.payload.level;
            }
        }
    }
});

export const { currentUnit } = unit.actions;

export default unit.reducer;