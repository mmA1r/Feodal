import { createSlice } from "@reduxjs/toolkit";

export const userLevel = createSlice({
    name: 'level',
    initialState: {
        value: 1,
    },
    reducers: {
        level: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { level } = userLevel.actions;

export default userLevel.reducer;