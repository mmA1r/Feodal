import { useSelector, useStore } from 'react-redux';
import StoreLoader from '../../../../../store/StoreLoader';

import UnitsTypeSelector from './unitsTypeSelector/UnitsTypeSelector';
import WithdrawButton from './withdrawButton/WithdrawButton';
import CloseWindow from './closeWindow/CloseWindow';

import './chooseUnitWindow.scss';

export default function ChooseUnitWindow() {

    const isUnitsWindowOpen = useSelector((state) => state.unitsInterface.value);
    const ui = useSelector((state) => state.interface.value.castle);
    const soldierFullHp = useSelector((state) => state.soldier.hp);
    const storeLoader = new StoreLoader();
    const store = useStore();

    function closeUnitsInterface() {
        return storeLoader.loadToStore(false, 'withdrawUnits');
    }

    function withdrawUnits() {
        const fullHpSoldiers = document.getElementsByClassName('soldier-full')[0]?.value-0;
        const damagedSoldiers = document.getElementsByClassName('soldier-damaged')[0]?.value-0
        storeLoader.loadToStore({
            type: 1,
            fullHpNumber: fullHpSoldiers,
            damagedNumber: damagedSoldiers,
            fullHp: soldierFullHp
        }, 'changeUnitsStatus');
        console.log(store.getState().gamer.units);
        closeUnitsInterface();
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
        </div>
    );
}