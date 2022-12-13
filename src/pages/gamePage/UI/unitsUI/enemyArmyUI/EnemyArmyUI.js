import { useSelector } from 'react-redux';
import './enemyArmyUI.scss';

export default function EnemyArmyUI() {

    const soldiersNum = useSelector((state) => state.currentArmy.soldiers.num);
    const assassinsNum = useSelector((state) => state.currentArmy.assassins.num);

    return (
        <div className='enemy-army-num-panel'>
            <div className='enemy-soldiers-num'>
                <span>ВОИНЫ:</span> <span className='army-number'>{soldiersNum}</span>
            </div>
            <div className='enemy-assassins-num'>
                <span>УБИЙЦЫ:</span> <span className='army-number'>{assassinsNum}</span>
            </div>
        </div>
    );
}