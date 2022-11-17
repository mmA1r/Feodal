import { createSlice } from "@reduxjs/toolkit";

export const soldier = createSlice({
    name: 'soldier',
    initialState: {
        value: {
            hp: 10,
            cost: 100,
            damage: 1,
            speed: 1
        },
    },
    reducers: {
        soldierValues: (state, action) => {
            if('hp' in action.payload) {
                state.value.hp = action.payload.hp;
            }
            if('cost' in action.payload) {
                state.value.cost = action.payload.cost;
            }
            if('damage' in action.payload) {
                state.value.damage = action.payload.damage;
            }
            if('speed' in action.payload) {
                state.value.speed = action.payload.speed;
            }
        }
    }
});

export const { soldierValues } = soldier.actions;

export default soldier.reducer;