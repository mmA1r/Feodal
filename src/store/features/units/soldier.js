import { createSlice } from "@reduxjs/toolkit";

export const soldier = createSlice({
    name: 'soldier',
    initialState: {
        hp: 0,
        cost: 0,
        damage: 0,
        speed: 0,
        might: 0
    },
    reducers: {
        soldierValues: (state, action) => {
            if('hp' in action.payload) {
                state.hp = action.payload.hp;
            }
            if('cost' in action.payload) {
                state.cost = action.payload.cost;
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

export const { soldierValues } = soldier.actions;

export default soldier.reducer;