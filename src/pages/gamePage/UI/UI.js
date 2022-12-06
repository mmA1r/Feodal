import { useSelector } from "react-redux";

import CastleInformPanel from "./castleUI/castleInformPanel/CastleInformPanel";
import CastleManagePanel from "./castleUI/castleManagePanel.js/CastleManagePanel";
import CastleMiniFrame from "./castleUI/castleMiniFrame/CastleMiniFrame";
import VillageInformPanel from "./villageUI/villageInformPanel/VillageInformPanel";
import VillageMiniFrame from "./villageUI/villageMiniFrame/VillageMiniFrame";
import ChooseUnitWindow from "./castleUI/chooseUintWindow/ChooseUnitWindow";
import UnitMiniFrame from "./unitsUI/unitUI/unitMiniFrame/UnitMiniFrame";
import UnitInformManagePanel from "./unitsUI/unitUI/unitInformManagePanel/UnitInformManagePanel";
import ArmyInfoManagePanel from "./unitsUI/armyUI/armyInfoManagePanel/ArmyInfoManagePanel";
import ArmyNum from "./unitsUI/armyUI/armyNum/ArmyNum";
import EnemyUnitInformPanel from "./unitsUI/enemyUnitUI/enemyUnitInformPanel/EnemyUnitInformPanel";
import EnemyUnitMiniFrame from "./unitsUI/enemyUnitUI/enemyUnitMiniFrame/EnemyUnitMiniFrame"
import EnemyArmyUI from "./unitsUI/enemyArmyUI/EnemyArmyUI";
import EnemyCastleInform from "./enemyCastleUI/enemyCastleInform/EnemyCastleInform";
import EnemyCastleMini from "./enemyCastleUI/enemyCastleMini/EnemyCastleMini";

import './UI.scss';


export default function UI() {
    const UI = useSelector((state) => state.interface.value);

    return (
        <div className={`pop-up-interface ${ !UI.hide ? 'show-pop-up-interface' : 'hide-pop-up-interface' }`}>
            <ChooseUnitWindow/>
            {
                UI.castle ? 
                    <div className={'castle-UI'}>
                        <CastleMiniFrame/>
                        <CastleInformPanel/>
                        <CastleManagePanel/> 
                    </div>
                : UI.enemyCastle ? 
                    <div className={'enemy-castle-UI'}>
                        <EnemyCastleMini/>
                        <EnemyCastleInform/>
                    </div>
                : UI.unit ?
                    <div className={'unit-UI'}>
                        <UnitInformManagePanel/>
                        <UnitMiniFrame/>
                    </div>
                : UI.enemyUnit ?
                    <div className={'enemy-unit-UI'}>
                        <EnemyUnitInformPanel/>
                        <EnemyUnitMiniFrame/>
                    </div>
                : UI.army ?
                    <div className={'army-UI'}>
                        <ArmyNum/>
                        <ArmyInfoManagePanel/>
                    </div>
                : UI.enemyArmy ?
                    <div className={'enemy-army-UI'}>
                        <EnemyArmyUI/>
                    </div>
                : UI.village ?
                    <div className={'village-UI'}>
                        <VillageMiniFrame/>
                        <VillageInformPanel/>
                    </div>
                : ''
            }
        </div>
    );
}