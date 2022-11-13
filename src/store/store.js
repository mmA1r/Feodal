import { configureStore } from "@reduxjs/toolkit";

import storeRoutes from './features/storeRoutes/storeRoutes';
import storeServer from './features/storeServer/storeServer';
import storeInterface from "./features/storeInterface/storeInterface";

export default configureStore({
    reducer: {
        routes: storeRoutes,
        server: storeServer,
        interface: storeInterface,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        })
});