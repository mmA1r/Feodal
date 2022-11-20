import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../../../../store/features/storeInterface/chooseUnitsInterface';
import './chooseUnitWindow.scss';

export default function ChooseUnitWindow() {

    const isUnitsWindowOpen = useSelector((state) => state.unitsInterface.value);
    const dispatch = useDispatch()

    function closeUnitsInterface() {
        return dispatch(open(false));
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