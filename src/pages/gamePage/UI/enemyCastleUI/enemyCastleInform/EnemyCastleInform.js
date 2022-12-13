import { useSelector } from 'react-redux';
import './enemyCastleInform.scss';

export default function EnemyCastleInform() {

    const fullHp = useSelector((state) => state.enemyCastle.fullHp);
    const currentHp = useSelector((state) => state.enemyCastle.currentHp);
    const army = useSelector((state) => state.enemyCastle.armyLength);

    return (
        <div className="enemy-castle-inform-panel">
            {army <= 0 ? <div className='can-be-captured-state'>МОЖНО ЗАХВАТИТЬ!</div> : ''}
            <span className='army-length'>{army}</span>
            <progress className='enemy-castle-hp-bar' value={currentHp} max={fullHp}/>
        </div>
    );
}