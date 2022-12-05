import { useSelector } from 'react-redux';
import ManageUnitButtons from '../../components/manageUnitButtons/ManageUnitButtons';
import './armyInfoManagePanel.scss';

export default function ArmyInfoManagePanel() {

    const fullHpSoldiers = useSelector((state) => state.currentArmy.soldiers.fullHp);
    const currentHpSoldiers = useSelector((state) => state.currentArmy.soldiers.currentHp)

    return (
        <div className='army-inform-manage-panel'>
            <div className='manage-units-button-army'>
                <ManageUnitButtons/>
            </div>
            <div className='army-units-icon-panel'>
                <div className='army-soldiers-army'>
                    <progress className='army-icons-hp' max={fullHpSoldiers} value={currentHpSoldiers}></progress>
                </div>
            </div>
            <div className='total-hp-panel'>
                <div className='hp-num-value-army'> {currentHpSoldiers} / {fullHpSoldiers}</div>
                <progress className='army-hp-bar' max={fullHpSoldiers} value={currentHpSoldiers}></progress>
            </div>
        </div>
    );
}