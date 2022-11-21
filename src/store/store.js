import { configureStore } from "@reduxjs/toolkit";

import storeRoutes from './features/storeRoutes/storeRoutes';
import storeServer from './features/storeServer/storeServer';
import chooseUnitsInterface from "./features/storeInterface/chooseUnitsInterface";
import storeInterface from "./features/storeInterface/userInterface";
import soldier from "./features/units/soldier";
import gamer from "./features/gamer/gamer";

export default configureStore({
    reducer: {
        routes: storeRoutes,
        server: storeServer,
        interface: storeInterface,
        unitsInterface: chooseUnitsInterface,
        gamer: gamer,
        soldier: soldier,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});