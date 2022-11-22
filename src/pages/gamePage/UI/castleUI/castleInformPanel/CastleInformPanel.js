import { useSelector } from 'react-redux';
import './castleInformPanel.scss';
import HpBar from './hpBar/HpBar';

export default function CastleInformPanel() {

    const units = useSelector((state) => state.gamer.units);
    // eslint-disable-next-line
    const soldiersNumber = units.reduce((accamulator, currentValue) => {
        if(currentValue.type === 1) {
            return accamulator += 1;
        }
    }, 0)

    return (
        <div className="castle-inform-panel">
            <div className="castle-name"></div>
            <div className="castle-inform-panel-border">
                <HpBar 
                    units={{
                        soldiers: soldiersNumber
                    }}
                />
                <div className='units-frame'>
                    <div className='soldier-number'>{soldiersNumber}</div>
                    <div className='solider-frame'></div>
                    {/* <div className='archer-frame'></div> */}
                </div>
                <div className="castle-inform-panel-back"></div>
            </div>
        </div>
    );
}