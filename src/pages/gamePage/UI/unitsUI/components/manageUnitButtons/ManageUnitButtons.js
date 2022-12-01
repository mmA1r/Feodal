import { useSelector } from 'react-redux';
import StoreLoader from '../../../../../../store/StoreLoader';
import AttackButton from './attackButton/AttackButton';
import MoveButton from './moveButton/MoveButton';
import StopButton from './stopButton/StopButton';
import './manageUnitButtons.scss';


export default function ManageUnitButtons() {
    const action = useSelector((state) => state.action);
    const storeLoader = new StoreLoader();

    function attack() {
        return storeLoader.loadToStore('attack', 'action');
    }

    function move() {
        return storeLoader.loadToStore('move', 'action');
    }

    function stop() {
        return storeLoader.loadToStore('stop', 'action');
    }

    return (
        <div className='manage-unit-buttons'>
           <button 
                className={`attack-unit-button`}
                onClick={() => attack()}
            >
                <AttackButton/>
            </button>
           <button
                className={`move-unit-button`}
                onClick={() => move()}
            >
                <MoveButton/>
            </button>
           <button
                className={`stop-unit-button`}
                onClick={() => stop()}
            >
                <StopButton/>
            </button>
        </div>
    );
}