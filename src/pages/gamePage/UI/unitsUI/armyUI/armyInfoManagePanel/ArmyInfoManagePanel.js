import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import StoreLoader from '../../../../../../store/StoreLoader';
import ManageUnitButtons from '../../components/manageUnitButtons/ManageUnitButtons';
import './armyInfoManagePanel.scss';

export default function ArmyInfoManagePanel() {

    const store = new StoreLoader();

    useEffect(() => {
        return () => {
            store.loadToStore('inactive', 'action');
        }
    });

    const fullHpSoldiers = useSelector((state) => state.currentArmy.soldiers.fullHp);
    const fullHpAssassins = useSelector((state) => state.currentArmy.assassins.fullHp);
    const currentHpSoldiers = useSelector((state) => state.currentArmy.soldiers.currentHp);
    const currentHpAssassins = useSelector((state) => state.currentArmy.assassins.currentHp);

    console.log(currentHpAssassins, '||', currentHpSoldiers);


    const totalArmyHp = fullHpSoldiers + fullHpAssassins;
    const currentArmyHp = currentHpSoldiers + currentHpAssassins;

    return (
        <div className='army-inform-manage-panel'>
            <div className='manage-units-button-army'>
                <ManageUnitButtons/>
            </div>
            <div className='army-units-icon-panel'>
                { currentHpSoldiers > 0 ? 
                    <div className='army-soldiers-army'>
                        <progress className='army-icons-hp' max={fullHpSoldiers} value={currentHpSoldiers}></progress>
                    </div>
                : '' }
                { currentHpAssassins > 0 ? 
                    <div className='army-assassins-army'>
                        <progress className='army-icons-hp' max={fullHpAssassins} value={currentHpAssassins}></progress>
                    </div> 
                : '' }
            </div>
            <div className='total-hp-panel'>
                <div className='hp-num-value-army'> {currentArmyHp} / {totalArmyHp}</div>
                <progress className='army-hp-bar' max={totalArmyHp} value={currentArmyHp}></progress>
            </div>
        </div>
    );
}