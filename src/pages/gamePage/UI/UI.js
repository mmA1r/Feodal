import React from "react";
import { useSelector } from "react-redux";

import CastleInformPanel from "./castleUI/castleInformPanel/CastleInformPanel";
import CastleManagePanel from "./castleUI/castleManagePanel.js/CastleManagePanel";
import CastleMiniFrame from "./castleUI/castleMiniFrame/CastleMiniFrame";
import VillageInformPanel from "./villageUI/villageInformPanel/VillageInformPanel";
import VillageMiniFrame from "./villageUI/villageMiniFrame/VillageMiniFrame";
import ChooseUnitWindow from "./castleUI/chooseUintWindow/ChooseUnitWindow";


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

                    </div>
                : UI.unit ?
                    <div className={'unit-UI'}>

                    </div>
                : UI.enemyUnit ?
                    <div className={'enemy-unit-UI'}>

                    </div>
                : UI.army ?
                    <div className={'army-UI'}>

                    </div>
                : UI.enemyArmy ?
                    <div className={'enemy-army-UI'}>

                    </div>
                : UI.village === 'village' ?
                    <div className={'village-UI'}>
                        <VillageMiniFrame/>
                        <VillageInformPanel/>
                    </div>
                : ''
            }
        </div>
    );
}