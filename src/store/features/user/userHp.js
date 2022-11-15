import { createSlice } from "@reduxjs/toolkit";

export const userHp = createSlice({
    name: 'hp',
    initialState: {
        value: 0,
    },
    reducers: {
        hp: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { hp } = userHp.actions;

export default userHp.reducer;