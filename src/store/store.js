import { configureStore } from "@reduxjs/toolkit";

import storeRoutes from './features/storeRoutes/storeRoutes';
import storeServer from './features/storeServer/storeServer';
import chooseUnitsInterface from "./features/storeInterface/chooseUnitsInterface";
import userInterface from "./features/storeInterface/userInterface";
import soldier from "./features/units/soldier";
import gamer from "./features/gamer/gamer";
import unit from "./features/currentUnit/currentUnit";
import army from "./features/currentArmy/currentArmy";
import action from "./features/buttonAction/buttonAction";
import village from './features/village/village';
import enemyCastle from "./features/enemyCastle/enemyCastle";

export default configureStore({
    reducer: {
        routes: storeRoutes,
        server: storeServer,
        interface: userInterface,
        unitsInterface: chooseUnitsInterface,
        gamer: gamer,
        soldier: soldier,
        currentUnit: unit,
        currentArmy: army,
        action: action,
        village: village,
        enemyCastle: enemyCastle
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});