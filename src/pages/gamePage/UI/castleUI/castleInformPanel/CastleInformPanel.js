import { useSelector } from 'react-redux';
import './castleInformPanel.scss';

export default function CastleInformPanel() {

    const units = useSelector((state) => state.userUnits.value);
// eslint-disable-next-line
    let castleHP = 0;
    let soldiersNumber = 0;

    units.forEach(unit => {
        castleHP += unit.hp-0;
        if(unit.type-0 === 1) {
            return soldiersNumber++;
        }
    });


    return (
        <div className="castle-inform-panel">
            <div className="castle-name"></div>
            <div className="castle-inform-panel-border">
                <div className='hp-bar'>
                    <div className='true-hp-bar'></div>
                    <div className='false-hp-bar'></div>
                </div>
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