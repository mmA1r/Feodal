import { createSlice } from "@reduxjs/toolkit";

import Server from '../../../services/server/Server';

const server = new Server();

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