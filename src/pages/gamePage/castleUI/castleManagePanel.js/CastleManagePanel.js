import React from "react";
import WarriorButton from "./manageButtons/warriorButton/WarriorButton";
import CastleUpgradeButton from "./manageButtons/castleUpgradeButton/CastleUpgradeButton";

import './castleManagePanel.scss';

export default class CastleManagePanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="castle-manage-panel">
                <button className="buy-warrior-unit-button">
                    <WarriorButton/>
                </button>
                <button className="upgrade-castle-button">
                    <CastleUpgradeButton/>
                </button>
                <div className="castle-manage-panel-back"/>
            </div>
        );
    }
}