import { useSelector } from 'react-redux';

import './enemyUnitInformPanel.scss';

export default function EnemyUnitInformPanel() {

    const soldier = useSelector((state) => state.soldier);
    const type = useSelector((state) => state.currentUnit.type);
    const currentHp = useSelector((state) => state.currentUnit.hp)

    function pushValues(value) {
        if(type === 1) {
            if(value === 'damage') {
                return soldier.damage;
            } else if(value === 'speed') {
                return soldier.speed;
            }
        }
    }

    return (
        <div className='enemy-unit-inform-panel'>
            <div className='enemy-unit-damage'>{pushValues('damage')}</div>
            <div className='enemy-unit-speed'>{pushValues('speed')}</div>
            <progress className='enemy-unit-hp-bar' max={soldier.hp} value={currentHp} />
        </div>
    );
}