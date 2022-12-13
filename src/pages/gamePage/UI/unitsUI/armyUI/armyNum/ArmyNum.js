import { useSelector } from 'react-redux';
import './armyNum.scss';

export default function ArmyNum() {

    const soldiersNum = useSelector((state) => state.currentArmy.soldiers.num);
    const assassinsNum = useSelector((state) => state.currentArmy.assassins.num);

    const generalArmyNumber = soldiersNum + assassinsNum;

    return (
        <div className='army-num-panel'>
            <div className='army-might'/>
            <div className='army-list'>
                { soldiersNum > 0 ? 
                    <div className='soldiers-num'>
                        <span>ВОИНЫ:</span> <span className='army-number'>{soldiersNum}</span>
                    </div>
                    : ''
                }
                { assassinsNum > 0 ? 
                    <div className='assassins-num'>
                        <span>УБИЙЦЫ:</span> <span className='army-number'>{assassinsNum}</span>
                    </div>
                    : ''
                }
            </div>
            <div className='army-total-number'>
                <div className='army-num'>{generalArmyNumber}</div>
            </div>
        </div>
    );
}