import { openUnitUI } from './features/storeInterface/chooseUnitsInterface';
import { gamer, changeStatus, outOfCastle } from './features/gamer/gamer';
import { ui } from './features/storeInterface/userInterface';
import { soldierValues } from './features/units/soldier';
import { assassinValues } from './features/units/assassin';
import { currentUnit } from './features/currentUnit/currentUnit';
import { currentArmy } from './features/currentArmy/currentArmy';
import { currentVillage } from './features/village/village';
import { buttonAction } from './features/buttonAction/buttonAction';
import { castleValues } from './features/enemyCastle/enemyCastle';
import { hintValues } from './features/hoverHint/hoverHint';
import { gameIsOver } from './features/gameOver/gameOver';
import { incValue } from './features/reRender/reRender';

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
            case 'assassin':
                return store.dispatch(assassinValues(value));
            case 'withdrawUnits':
                return store.dispatch(openUnitUI(value));
            case 'currentUnit':
                return store.dispatch(currentUnit(value));
            case 'currentArmy':
                return store.dispatch(currentArmy(value));
            case 'action':
                return store.dispatch(buttonAction(value));
            case 'village':
                return store.dispatch(currentVillage(value));
            case 'enemyCastle':
                return store.dispatch(castleValues(value));
            case 'hint':
                return store.dispatch(hintValues(value));
            case 'gameOver':
                return store.dispatch(gameIsOver(value));
            case 'reRender':
                return store.dispatch(incValue(value));
            default: return true;
        }
    }

    restore() {
        store.dispatch(gamer({ level: 1, nextRentTime: 0, upadateLevelCost: 0, money: 0, units: [], might: 0 }));
        store.dispatch(ui('hide'));
        store.dispatch(buttonAction('inactive'));
        store.dispatch(openUnitUI(false));
        store.dispatch(currentVillage({ attacked: false }));
        store.dispatch(hintValues({state: false, top: 0, left: 0, type: null}));
        store.dispatch(gameIsOver(false));
    }
}