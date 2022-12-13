import { createSlice } from "@reduxjs/toolkit";

export const chooseUnitsInterface = createSlice({
    name: 'unitsUI',
    initialState: {
        value: false,
    },
    reducers: {
        openUnitUI: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { openUnitUI } = chooseUnitsInterface.actions;

export default chooseUnitsInterface.reducer;