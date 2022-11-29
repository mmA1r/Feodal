import { createSlice } from "@reduxjs/toolkit";

export const userInterface = createSlice({
    name: 'interface',
    initialState: {
        value: {
            hide: false,
            castle: false,
            enemyCastle: false,
            unit: false,
            enemyUnit: false,
            army: false,
            enemyArmy: false,
            village: false
        }
    },
    reducers: {
        ui: (state, action) => {
            if(action.payload === 'hide') {
                state.value.castle = state.value.enemyCastle = state.value.unit = state.value.enemyUnit = state.value.army = state.value.enemyArmy = state.value.village = false;
                state.value.hide = true;
            } else if(action.payload === 'castle') {
                state.value.hide = state.value.enemyCastle = state.value.unit = state.value.enemyUnit = state.value.army = state.value.enemyArmy = state.value.village = false;
                state.value.castle = true;
            } else if(action.payload === 'enemyCastle') {
                state.value.hide = state.value.castle = state.value.unit = state.value.enemyUnit = state.value.army = state.value.enemyArmy = state.value.village = false;
                state.value.enemyCastle = true;
            } else if(action.payload === 'unit') {
                state.value.hide = state.value.castle = state.value.enemyCastle = state.value.enemyUnit = state.value.army = state.value.enemyArmy = state.value.village = false;
                state.value.unit = true;
            } else if(action.payload === 'enemyUnit') {
                state.value.hide = state.value.castle = state.value.enemyCastle = state.value.unit = state.value.army = state.value.enemyArmy = state.value.village = false;
                state.value.enemyUnit = true;
            } else if(action.payload === 'army') {
                state.value.hide = state.value.castle = state.value.enemyCastle = state.value.unit = state.value.enemyUnit = state.value.enemyArmy = state.value.village = false;
                state.value.army = true;
            } else if(action.payload === 'enemyArmy') {
                state.value.hide = state.value.castle = state.value.enemyCastle = state.value.unit = state.value.enemyUnit = state.value.army = state.value.village = false;
                state.value.enemyArmy = true;
            } else if(action.payload === 'village') {
                state.value.hide = state.value.castle = state.value.enemyCastle = state.value.unit = state.value.enemyUnit = state.value.army = state.value.enemyArmy = false;
                state.value.village = true;
            }
        }
    }
});

export const { ui } = userInterface.actions;

export default userInterface.reducer;