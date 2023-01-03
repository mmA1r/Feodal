import { useSelector } from 'react-redux';
import UnitsSelector from './unitsSelector/UnitsSelector';
import './unitType.scss';

export default function UnitType(props) {
    const { units, type } = props;
    const soldierHp = useSelector((state) => state.soldier.hp-0);
    const assassinHP = useSelector((state) => state.assassin.hp-0);

    const fullHpSoldiers = [];
    const damagedSoldiers = [];
    const fullHpAssassins = [];
    const damagedAssassins = [];

    units.forEach(unit => {
        if(type === 1) {
            if(unit?.hp === soldierHp) {
                fullHpSoldiers.push(unit);
            } else if(unit?.hp < soldierHp) {
                damagedSoldiers.push(unit);
            }
        } else if(type === 2) {
            if(unit?.hp === assassinHP) {
                fullHpAssassins.push(unit);
            } else if(unit?.hp < assassinHP) {
                damagedAssassins.push(unit);
            }
        }
    });

    return (
        <div className='unit-type-block'>
            {type === 1 ? fullHpSoldiers?.length > 0 ? <UnitsSelector units={fullHpSoldiers} damaged={false} type={'soldier'}/> : '' : ''}
            {type === 1 ? damagedSoldiers?.length > 0 ? <UnitsSelector units={damagedSoldiers} damaged={true} type={'soldier'}/> : '' : ''}
            {type === 2 ? fullHpAssassins?.length > 0 ? <UnitsSelector units={fullHpAssassins} damaged={false} type={'assassin'}/> : '' : ''}
            {type === 2 ? damagedAssassins?.length > 0 ? <UnitsSelector units={damagedAssassins} damaged={true} type={'assassin'}/> : '' : ''}
        </div>
    );
}