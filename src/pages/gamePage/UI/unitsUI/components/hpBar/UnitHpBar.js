import { useSelector } from 'react-redux';
import './unitHpBar.scss';

export default function UnitHpBar() {

    const type = useSelector((state) => state.currentUnit.type);
    const hp = useSelector((state) => state.currentUnit.hp);
    const fullHp = 10
    return (
        <progress className='unit-hp-bar' value={hp} max={fullHp}></progress>
    );
}