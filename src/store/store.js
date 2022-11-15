import { configureStore } from "@reduxjs/toolkit";

import storeRoutes from './features/storeRoutes/storeRoutes';
import storeServer from './features/storeServer/storeServer';
import storeInterface from "./features/storeInterface/storeInterface";
import userMoney from "./features/user/userMoney";
import userUnits from "./features/user/userUnits";
import userLevel from './features/user/userLevel';

export default configureStore({
    reducer: {
        routes: storeRoutes,
        server: storeServer,
        interface: storeInterface,
        userMoney: userMoney,
        userUnits: userUnits,
        userLevel: userLevel,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});