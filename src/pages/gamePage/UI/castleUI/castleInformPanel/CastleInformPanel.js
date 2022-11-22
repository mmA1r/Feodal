import { useSelector } from 'react-redux';
import './castleInformPanel.scss';
import HpBar from './hpBar/HpBar';

export default function CastleInformPanel() {

    const units = useSelector((state) => state.gamer.units);
    
    let soldiersNumber = 0;

    units.forEach(unit => {
        if(unit.type-0 === 1) {
            return soldiersNumber++;
        }
    });


    return (
        <div className="castle-inform-panel">
            <div className="castle-name"></div>
            <div className="castle-inform-panel-border">
                <HpBar/>
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