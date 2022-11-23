import { createSlice } from "@reduxjs/toolkit";

export const userMoney = createSlice({
    name: 'money',
    initialState: {
        value: 0,
    },
    reducers: {
        money: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { money } = userMoney.actions;

export default userMoney.reducer;