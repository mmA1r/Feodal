import { createSlice } from "@reduxjs/toolkit";

export const army = createSlice({
    name: 'army',
    initialState: {
        soldiers: {
            fullHp: 0,
            currentHp: 0,
            num: 0
        }
    },
    reducers: {
        currentArmy: (state, action) => {
            if('soldiers' in action.payload) {
                if('fullHp' in action.payload.soldiers) {
                    state.soldiers.fullHp = action.payload.soldiers.fullHp;
                }
                if('currentHp' in action.payload.soldiers) {
                    state.soldiers.currentHp = action.payload.soldiers.currentHp;
                }
                if('num' in action.payload.soldiers) {
                    state.soldiers.num = action.payload.soldiers.num;
                }
            }
        }
    }
});

export const { currentArmy } = army.actions;

export default army.reducer;