import { openUnitUI } from './features/storeInterface/chooseUnitsInterface';
import { gamerStore } from './features/gamer/gamer';
import { ui } from './features/storeInterface/userInterface';
import { soldierValues } from './features/units/soldier';

import store from './store';

export default class StoreLoader {

    loadToStore(value, storeType) {
        switch(storeType) {
            case 'gamer':
                return store.dispatch(gamerStore(value));
            case 'ui':
                return store.dispatch(ui(value));
            case 'soldier':
                return store.dispatch(soldierValues(value));
            case 'withdrawUnits':
                return store.dispatch(openUnitUI(value));
            default: return true;
        }
    }
}