import { useSelector } from 'react-redux';
import './hpBar.scss';

export default function HpBar() {

    const castleUnits = useSelector((state) => state.gamer.units);
    const castleHp = useSelector((state) => state.gamer.hp);

    const unitsHp = castleUnits.map(unit => {
        return unit.hp-0;
    });

    const fullHp = unitsHp.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    }, 0);

    return (
        <div className="hp-bar">
            <div className='hp-bar-frame'></div>
            <div className='hp-counter'> {castleHp} / {fullHp}</div>
            <progress value={castleHp} max={fullHp} className='true-hp-bar'/>
        </div>
    );
}