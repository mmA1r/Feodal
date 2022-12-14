import { useSelector } from 'react-redux';
import './castleInformPanel.scss';
import HpBar from './hpBar/HpBar';

export default function CastleInformPanel() {

    const units = useSelector((state) => state.gamer.units);
    const soldiersNumber = units.reduce((accamulator, currentValue) => {
        if(currentValue.type === 1) {
            return accamulator += 1;
        } else return accamulator += 0;
    }, 0);
    const assassinsNumber = units.reduce((accamulator, currentValue) => {
        if(currentValue.type === 2) {
            return accamulator += 1;
        } else return accamulator += 0;
    }, 0);

    return (
        <div className="castle-inform-panel">
            <div className="castle-name"></div>
            <div className="castle-inform-panel-border">
                <HpBar 
                    units={{
                        soldiers: soldiersNumber,
                        assassins: assassinsNumber
                    }}
                />
                <div className='units-frame'>
                    <div className='soldier-number'>{soldiersNumber}</div>
                    <div className='solider-frame'></div>
                    <div className='assassin-number'>{assassinsNumber}</div>
                    <div className='assassin-frame'></div>
                </div>
                <div className="castle-inform-panel-back"></div>
            </div>
        </div>
    );
}