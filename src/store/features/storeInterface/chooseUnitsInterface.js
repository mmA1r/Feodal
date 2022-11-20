import { createSlice } from "@reduxjs/toolkit";

export const chooseUnitsInterface = createSlice({
    name: 'hp',
    initialState: {
        value: false,
    },
    reducers: {
        open: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { open } = chooseUnitsInterface.actions;

export default chooseUnitsInterface.reducer;