import { openUnitUI } from './features/storeInterface/chooseUnitsInterface';
import { gamer, changeStatus, outOfCastle } from './features/gamer/gamer';
import { ui } from './features/storeInterface/userInterface';
import { soldierValues } from './features/units/soldier';

import store from './store';

export default class StoreLoader {

    loadToStore(value, storeType) {
        switch(storeType) {
            case 'gamer':
                return store.dispatch(gamer(value));
            case 'changeUnitsStatus': 
                return store.dispatch(changeStatus(value));
            case 'outOfCastle' :
                return store.dispatch(outOfCastle(value));
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