import { createSlice } from "@reduxjs/toolkit";

import Server from '../../../services/server/Server';

const localToken = window.localStorage.getItem('token') || null;

const server = new Server(localToken);

export const storeServer = createSlice({
    name: 'server',
    initialState: {
        value: server,
    },
    reducers: {
        server: (state) => {
            state.value = server;
        }
    }
});

export const { routes } = storeServer.actions;

export default storeServer.reducer;