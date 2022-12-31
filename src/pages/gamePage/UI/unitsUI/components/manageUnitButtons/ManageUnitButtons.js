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

    function showHint(e, actionName) {
        return storeLoader.loadToStore({
            state: true,
            type: actionName,
            top: e.pageY, 
            left: e.pageX
        }, 'hint');
    }

    function hideHint() {
        return storeLoader.loadToStore({
            state: false,
            type: null,
            top: 2000, 
            left: 0
        }, 'hint');
    }


    return (
        <div className='manage-unit-buttons'>
           <button 
                className={`attack-unit-button`}
                onClick={() => attack()}
                onMouseEnter={(e) => showHint(e, 'attack')}
                onMouseLeave={() => hideHint()}
            >
                <AttackButton/>
            </button>
           <button
                className={`move-unit-button`}
                onClick={() => move()}
                onMouseEnter={(e) => showHint(e, 'move')}
                onMouseLeave={() => hideHint()}
            >
                <MoveButton/>
            </button>
           <button
                className={`stop-unit-button`}
                onClick={() => stop()}
                onMouseEnter={(e) => showHint(e, 'stop')}
                onMouseLeave={() => hideHint()}
            >
                <StopButton/>
            </button>
        </div>
    );
}