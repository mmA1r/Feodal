import { useSelector } from 'react-redux';
import UnitType from './unitType/UnitType';

import './unitsTypeSelector.scss';

export default function ChooseUnitWindow() {

    const units = useSelector((state) => state.gamer.units);
    // eslint-disable-next-line
    const soldires = units.map(unit => {
        if(unit.type === 1 && unit.status === 'inCastle') {
            return unit;
        }
    })
    const unitsType = units.map(unit => {
        return unit.type;
    });
    const types = unitsType.filter((item, pos) => {
        return unitsType.indexOf(item) === pos;
    });

    return (
        <div className='units-type-selector'>
            {
                // eslint-disable-next-line
                types.map(type => {
                    if(type === 1) {
                        return <UnitType key={soldires} units={soldires}/>
                    }
                })
            }
        </div>
    );
}