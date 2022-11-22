import { useSelector } from 'react-redux';
import StoreLoader from '../../../../../store/StoreLoader';
import './chooseUnitWindow.scss';

export default function ChooseUnitWindow() {

    const isUnitsWindowOpen = useSelector((state) => state.unitsInterface.value);
    const storeLoader = new StoreLoader();

    function closeUnitsInterface() {
        return storeLoader.loadToStore(false, 'withdrawUnits');
    }

    return (
        <div className={`choose-units-ui ${isUnitsWindowOpen ? 'units-interface-show' : 'units-interface-hide'}`}>
            <button 
                className='close-units-ui'
                onClick={() => closeUnitsInterface()}
            ></button>
            <button
                className='withdraw-army-button'
            ></button>
        </div>
    );
}