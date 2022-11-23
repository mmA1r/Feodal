import UnitsSelector from './unitsSelector/UnitsSelector';
import './unitType.scss';

export default function UnitType(props) {
    const { units } = props;

    const fullHpSoldiers = units.reduce((result, unit) => {
        if(unit?.hp === 10) {
            result.push(unit);
        }
        return result;
    }, []);

    const damagedSoldiers = units.reduce((result, unit) => {
        if(unit?.hp < 10) {
            result.push(unit);
        }
        return result;
    }, []);

    return (
        <div className='unit-type-block'>
            <UnitsSelector units={fullHpSoldiers} damaged={false} type={'soldier'}/>
            {damagedSoldiers.length > 0 ? <UnitsSelector units={damagedSoldiers} damaged={true} type={'soldier'}/> : ''}
        </div>
    );
}