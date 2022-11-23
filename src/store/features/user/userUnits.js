import { createSlice } from "@reduxjs/toolkit";

export const userUnits = createSlice({
    name: 'units',
    initialState: {
        value: [],
    },
    reducers: {
        units: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { units } = userUnits.actions;

export default userUnits.reducer;