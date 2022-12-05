import { useSelector } from 'react-redux';
import UnitHpBar from '../hpBar/UnitHpBar';
import ManageUnitButtons from '../../components/manageUnitButtons/ManageUnitButtons';

import './unitInformManagePanel.scss';

export default function UnitInformManagePanel() {


    const soldier = useSelector((state) => state.soldier);
    const type = useSelector((state) => state.currentUnit.type);

    function pushValues(value) {
        if(type === 1) {
            if(value === 'damage') {
                return soldier.damage;
            } else if(value === 'speed') {
                return soldier.speed;
            } else if(value === 'might') {
                return soldier.might;
            }
        }
    }

    return (
        <div className='unit-inform-manage-panel'>
            <ManageUnitButtons/>
            <div className='unit-stats-panel'>
                <div className='unit-damage'>{pushValues('damage')}</div>
                <div className='unit-might'>{pushValues('might')}</div>
                <div className='unit-speed'>{pushValues('speed')}</div>
            </div>
            <UnitHpBar type={type}/>
        </div>
    );
}