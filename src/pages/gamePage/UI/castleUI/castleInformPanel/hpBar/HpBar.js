import { useSelector } from 'react-redux';
import './hpBar.scss';

export default function HpBar(props) {
    const { units } = props;

    const castleUnits = useSelector((state) => state.gamer.units);
    const soldierTypeHp = useSelector((state) => state.soldier.hp);

    const fullHp = units.soldiers * soldierTypeHp;

    const currentHp = castleUnits.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.hp-0;
    }, 0);

    return (
        <div>
            {
                fullHp > 0 && currentHp > 0 ? 
                    <div className="hp-bar">
                        <div className='hp-bar-frame'></div>
                        <div className='hp-counter'> {currentHp} / {fullHp}</div>
                        <progress value={currentHp} max={fullHp} className='true-hp-bar'/>
                    </div>
                : ''
            }
        </div>
    );
}