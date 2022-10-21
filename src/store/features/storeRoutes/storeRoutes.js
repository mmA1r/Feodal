import { createSlice } from "@reduxjs/toolkit";

import ROUTES from '../../../pages/routes/routes';

export const storeRoutes = createSlice({
    name: 'routes',
    initialState: {
        value: ROUTES,
    },
    reducers: {
        routes: (state) => {
            state.value = ROUTES;
        }
    }
});

export const { routes } = storeRoutes.actions;

export default storeRoutes.reducer;