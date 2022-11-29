import { createSlice } from "@reduxjs/toolkit";

export const army = createSlice({
    name: 'army',
    initialState: {
        soldiers: []
    },
    reducers: {
        currentArmy: (state, action) => {
            if('soldiers' in action.payload) {
                state.soldiers = action.payload.soldiers;
            }
        }
    }
});

export const { currentArmy } = army.actions;

export default army.reducer;