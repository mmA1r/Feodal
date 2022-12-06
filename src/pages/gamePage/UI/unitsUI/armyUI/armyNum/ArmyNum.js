import { useSelector } from 'react-redux';
import './armyNum.scss';

export default function ArmyNum() {

    const soldiersNum = useSelector((state) => state.currentArmy.soldiers.num)

    return (
        <div className='army-num-panel'>
            <div className='army-might'/>
            <div className='army-list'>
                <div className='soldiers-num'>
                    <span>ВОИНЫ:</span> <span className='army-number'>{soldiersNum}</span>
                </div>
            </div>
            <div className='army-total-number'>
                <div className='army-num'>{soldiersNum}</div>
            </div>
        </div>
    );
}