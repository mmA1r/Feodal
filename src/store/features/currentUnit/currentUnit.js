import { createSlice } from "@reduxjs/toolkit";

export const unit = createSlice({
    name: 'unit',
    initialState: {
        hp: 0,
        damage: 0,
        speed: 0,
        might: 0
    },
    reducers: {
        currentUnit: (state, action) => {
            if('hp' in action.payload) {
                state.hp = action.payload.hp;
            }
            if('damage' in action.payload) {
                state.damage = action.payload.damage;
            }
            if('speed' in action.payload) {
                state.speed = action.payload.speed;
            }
            if('might' in action.payload) {
                state.might = action.payload.might;
            }
        }
    }
});

export const { currentUnit } = unit.actions;

export default unit.reducer;