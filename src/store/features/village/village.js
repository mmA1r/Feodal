import { createSlice } from "@reduxjs/toolkit";

export const village = createSlice({
    name: 'village',
    initialState: {
        currentHp: 0,
        fullHp: 0,
        population: 0,
        villageLevel: 1,
        id: 0,
        attacked: false,
        canBeRobbed: false
    },
    reducers: {
        currentVillage: (state, action) => {
            if('villageLevel' in action.payload) {
                state.villageLevel = action.payload.villageLevel;
            }
            if('currentHp' in action.payload) {
                state.currentHp = action.payload.currentHp;
            }
            if('fullHp' in action.payload) {
                state.fullHp = action.payload.fullHp;
            }
            if('population' in action.payload) {
                state.population = action.payload.population;
            }
            if('id' in action.payload) {
                state.id = action.payload.id;
            }
            if('attacked' in action.payload) {
                state.attacked = action.payload.attacked;
            }
            if('canBeRobbed' in action.payload) {
                state.canBeRobbed = action.payload.canBeRobbed;
            }
        }
    }
});

export const { currentVillage } = village.actions;

export default village.reducer;