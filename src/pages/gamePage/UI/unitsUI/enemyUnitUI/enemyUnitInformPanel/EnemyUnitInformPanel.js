import { useSelector } from 'react-redux';

import './enemyUnitInformPanel.scss';

export default function EnemyUnitInformPanel() {

    const soldier = useSelector((state) => state.soldier);
    const assassin = useSelector((state) => state.assassin);
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
        if(type === 2) {
            if(value === 'damage') {
                return assassin.damage;
            } else if(value === 'speed') {
                return assassin.speed;
            }
        }
    }

    return (
        <div className='enemy-unit-inform-panel'>
            <div className='enemy-unit-damage'>{pushValues('damage')}</div>
            <div className='enemy-unit-speed'>{pushValues('speed')}</div>
            <progress className='enemy-unit-hp-bar' max={ type === 1 ? soldier.hp : type === 2 ? assassin.hp : 0 } value={currentHp} />
        </div>
    );
}