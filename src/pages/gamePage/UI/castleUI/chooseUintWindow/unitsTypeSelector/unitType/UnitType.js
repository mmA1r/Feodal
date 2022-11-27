import { useSelector } from 'react-redux';
import UnitsSelector from './unitsSelector/UnitsSelector';
import './unitType.scss';

export default function UnitType(props) {
    const { units } = props;
    const soldierHp = useSelector((state) => state.soldier.hp-0);

    const fullHpSoldiers = units.reduce((result, unit) => {
        if(unit?.hp === soldierHp) {
            result.push(unit);
        }
        return result;
    }, []);

    const damagedSoldiers = units.reduce((result, unit) => {
        if(unit?.hp < soldierHp) {
            result.push(unit);
        }
        return result;
    }, []);

    return (
        <div className='unit-type-block'>
            {fullHpSoldiers?.length > 0 ? <UnitsSelector units={fullHpSoldiers} damaged={false} type={'soldier'}/> : ''}
            {damagedSoldiers?.length > 0 ? <UnitsSelector units={damagedSoldiers} damaged={true} type={'soldier'}/> : ''}
        </div>
    );
}