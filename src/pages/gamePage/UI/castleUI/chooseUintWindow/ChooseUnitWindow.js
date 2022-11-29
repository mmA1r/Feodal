import { useSelector } from 'react-redux';
import StoreLoader from '../../../../../store/StoreLoader';

import UnitsTypeSelector from './unitsTypeSelector/UnitsTypeSelector';
import WithdrawButton from './withdrawButton/WithdrawButton';
import WithdrawAllButton from './withdrawAllButton/withdrawAllButton';
import CloseWindow from './closeWindow/CloseWindow';

import './chooseUnitWindow.scss';

export default function ChooseUnitWindow() {

    const isUnitsWindowOpen = useSelector((state) => state.unitsInterface.value);
    const ui = useSelector((state) => state.interface.value.castle);
    const soldierFullHp = useSelector((state) => state.soldier.hp);
    const storeLoader = new StoreLoader();

    function closeUnitsInterface() {
        return storeLoader.loadToStore(false, 'withdrawUnits');
    }

    function withdrawUnits() {
        let fullHpSoldiers = 0;
        let damagedSoldiers = 0;
        const fullSoldiers = document.getElementsByClassName('soldier-full')[0]?.value;
        const soldiersDamaged = document.getElementsByClassName('soldier-damaged')[0]?.value
        if(fullSoldiers && fullSoldiers-0 >= 0) {
            fullHpSoldiers = fullSoldiers-0;
        } 
        if(soldiersDamaged && soldiersDamaged-0 >= 0) {
            damagedSoldiers = soldiersDamaged-0;
        }
        storeLoader.loadToStore({
            type: 1,
            fullHpNumber: fullHpSoldiers,
            damagedNumber: damagedSoldiers,
            fullHp: soldierFullHp
        }, 'changeUnitsStatus');
        closeUnitsInterface();
    }

    function withdrawAllUnits() {
        storeLoader.loadToStore('outOfCastle', 'outOfCastle');
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
            <button
                className='withdraw-all-units'
                onClick={() => withdrawAllUnits()}
            >
                <WithdrawAllButton/>
            </button>
        </div>
    );
}