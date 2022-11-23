import { createSlice } from "@reduxjs/toolkit";

export const storeInterface = createSlice({
    name: 'interface',
    initialState: {
        value: 'castle',
    },
    reducers: {
        hide: (state) => {
            state.value = 'hide';
        },
        castle: (state) => {
            state.value = 'castle';
        },
        enemyCastle: (state) => {
            state.value = 'enemyCastle';
        },
        unit: (state) => {
            state.value = 'unit';
        },
        enemyUnit: (state) => {
            state.value = 'enemyUnit';
        },
        army: (state) => {
            state.value = 'army';
        },
        enemyArmy: (state) => {
            state.value = 'enemyArmy';
        },
        village: (state) => {
            state.value = 'village';
        }
    }
});

export const { hide, castle, enemyCastle, unit, enemyUnit, army, enemyArmy, village } = storeInterface.actions;

export default storeInterface.reducer;