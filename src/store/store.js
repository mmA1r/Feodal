import { configureStore } from "@reduxjs/toolkit";

import storeRoutes from './features/storeRoutes/storeRoutes';
import storeServer from './features/storeServer/storeServer';

export default configureStore({
    reducer: {
        routes: storeRoutes,
        server: storeServer,
    }
});