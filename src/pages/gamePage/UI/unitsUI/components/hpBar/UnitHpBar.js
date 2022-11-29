import { useSelector } from 'react-redux';
import FrameHpBar from './frameHpBar/FrameHpBar';
import './unitHpBar.scss';

export default function UnitHpBar(props) {
    const { type, hp } = props;

    const soldierHp = useSelector((state) => state.soldier.hp);

    function fullHp() {
        if(type === 1) {
            return soldierHp;
        }
    }

    return (
        <div className='unit-hp-bar-box'>
            <div className='unit-hp-number'>{hp} / {fullHp()}</div>
            <FrameHpBar/>
            <progress className='unit-hp-bar' value={hp} max={fullHp()}></progress>
        </div>
    );
}