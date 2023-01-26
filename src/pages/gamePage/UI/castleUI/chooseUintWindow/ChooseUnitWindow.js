import { useSelector } from 'react-redux';
import StoreLoader from '../../../../../store/StoreLoader';

import UnitsTypeSelector from './unitsTypeSelector/UnitsTypeSelector';
import WithdrawButton from './withdrawButton/WithdrawButton';
import WithdrawAllButton from './withdrawAllButton/withdrawAllButton';
import CloseWindow from './closeWindow/CloseWindow';

import './chooseUnitWindow.scss';
import store from '../../../../../store/store';

export default function ChooseUnitWindow() {

    const isUnitsWindowOpen = useSelector((state) => state.unitsInterface.value);
    const ui = useSelector((state) => state.interface.value.castle);
    const soldierFullHp = useSelector((state) => state.soldier.hp);
    const assassinFullHp = useSelector((state) => state.assassin.hp);
    const storeLoader = new StoreLoader();

    function closeUnitsInterface() {
        return storeLoader.loadToStore(false, 'withdrawUnits');
    }

    function withdrawUnits() {
        let fullHpSoldiers = 0;
        let damagedSoldiers = 0;
        let fullHpAssassins = 0;
        let damagedAssassins = 0;
        const fullSoldiers = document.getElementsByClassName('soldier-full')[0]?.value;
        const soldiersDamaged = document.getElementsByClassName('soldier-damaged')[0]?.value;
        const fullAssassins = document.getElementsByClassName('assassin-full')[0]?.value;
        const AssassinsDamaged = document.getElementsByClassName('assassin-damaged')[0]?.value;

        console.log(AssassinsDamaged, soldiersDamaged);

        if(fullSoldiers-0 >= 0) {
            fullHpSoldiers = fullSoldiers-0;
        } 
        if(soldiersDamaged-0 >= 0) {
            damagedSoldiers = soldiersDamaged-0;
        }
        if(fullAssassins-0 >= 0) {
            fullHpAssassins = fullAssassins-0;
        } 
        if(AssassinsDamaged-0 >= 0) {
            damagedAssassins = AssassinsDamaged-0;
        }
        if(fullHpSoldiers || damagedSoldiers) {
            storeLoader.loadToStore({
                type: 1,
                fullHpNumber: fullHpSoldiers,
                damagedNumber: damagedSoldiers,
                fullHp: soldierFullHp
            }, 'changeUnitsStatus');
        }
        if(fullHpAssassins || damagedAssassins) {
            storeLoader.loadToStore({
                type: 2,
                fullHpNumber: fullHpAssassins,
                damagedNumber: damagedAssassins,
                fullHp: assassinFullHp
            }, 'changeUnitsStatus');
        }
        closeUnitsInterface();
        store.getState().changeStoreFlag.function();
    }

    function withdrawAllUnits() {
        storeLoader.loadToStore('outOfCastle', 'outOfCastle');
        closeUnitsInterface();
        store.getState().changeStoreFlag.function();
    }

    return (
        <div className={`choose-units-ui ${(isUnitsWindowOpen && ui) ? 'units-interface-show' : 'units-interface-hide'}`}>
            <UnitsTypeSelector/>
            <button 
                className='close-units-ui'
                onClick={() => closeUnitsInterface()}
            >
                <CloseWindow/>
            </button>
            <button
                className='withdraw-army-button'
                onClick={() => withdrawUnits()}
            >
                <WithdrawButton/>
            </button>
            <button
                className='withdraw-all-units'
                onClick={() => withdrawAllUnits()}
            >
                <WithdrawAllButton/>
            </button>
        </div>
    );
}