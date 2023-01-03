import { useSelector } from 'react-redux';
import UnitType from './unitType/UnitType';

import './unitsTypeSelector.scss';

export default function ChooseUnitWindow() {

    const units = useSelector((state) => state.gamer.units);
    const soldiers = [];
    const assassins = [];
    let soldiersKey;
    let assassinsKey;

    units.forEach(unit => {
        if(unit.status === 'inCastle') {
            if(unit.type === 1) {
                return soldiers.push(unit);
            } else if(unit.type === 2) {
                return assassins.push(unit);
            }
        }
    });

    if(soldiers.length === assassins.length) {
        soldiersKey = 1; //index of type to not to cause 'the same keys for components' error
        assassinsKey = 2;
    } else {
        soldiersKey = soldiers;
        assassinsKey = assassins;
    }

    const unitsType = units.map(unit => {
        return unit.type;
    });
    const types = unitsType.filter((item, pos) => {
        return unitsType.indexOf(item) === pos;
    });

    return (
        <div className='units-type-selector'>
            {
                types.map(type => {
                    if(type === 1) {
                        return <UnitType key={soldiersKey} units={soldiers} type={1}/>
                    } else if(type === 2) {
                        return <UnitType key={assassinsKey} units={assassins} type={2}/>
                    }
                    return null;
                })
            }
        </div>
    );
}