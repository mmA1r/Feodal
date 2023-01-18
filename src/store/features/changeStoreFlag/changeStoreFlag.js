import { createSlice } from "@reduxjs/toolkit";

export const changeStoreFlag = createSlice({
    name: 'changeStoreFlag',
    initialState: {
        function: null
    },
    reducers: {
        changeFunction: (state, action) => {
            state.function = action.payload;
        }
    }
});

export const { changeFunction } = changeStoreFlag.actions;

export default changeStoreFlag.reducer;