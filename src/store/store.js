import { configureStore } from "@reduxjs/toolkit";

import storeRoutes from './features/storeRoutes/storeRoutes';
import storeServer from './features/storeServer/storeServer';
import storeInterface from "./features/storeInterface/storeInterface";
import userMoney from "./features/user/userMoney";
import userUnits from "./features/user/userUnits";
import userLevel from './features/user/userLevel';
import userHp from "./features/user/userHp";
import soldier from "./features/units/soldier";

export default configureStore({
    reducer: {
        routes: storeRoutes,
        server: storeServer,
        interface: storeInterface,
        userMoney: userMoney,
        userUnits: userUnits,
        userLevel: userLevel,
        userHp: userHp,
        soldier: soldier,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});