import React from "react";

import store from "../../../../store/store";

import Money from "./money/Money";
import WarriorButton from "./manageButtons/warriorButton/WarriorButton";
import CastleUpgradeButton from "./manageButtons/castleUpgradeButton/CastleUpgradeButton";

import './castleManagePanel.scss';

export default class CastleManagePanel extends React.Component {
    constructor() {
        super();

        this.server = store.getState().server.value;

        this.units = [];
        this.cost = 0;

        this.state = {
            showPrice: false,
            unit: 'soldier'
        }
    }

    componentDidMount() {
        return this.getUnitsTypes();
    }

    async getUnitsTypes() {
        this.units = await this.server.getUnitsTypes();
    }

    showCost(unitName = 0, castle) {
        this.units.forEach(unit => {
            if(unit.name === unitName) {
                return this.cost = unit.cost;
            } else  {
                this.cost = 0;
            }
        });
        return this.setState({ showPrice: true, unit: unitName });
    }

    hideCost() {
        return this.setState({ showPrice: false });
    }

    render() {
        return (
            <div className="castle-manage-panel">
                <div className={`price ${this.state.showPrice ? 'show-price' : 'hide-price'}`}>
                    <Money/>
                    <span className="price-num">{this.cost}</span>
                </div>
                <button
                    className="buy-warrior-unit-button"
                    onMouseOver={() => this.showCost("soldier")}
                    onMouseOut={() => this.hideCost()}
                >
                    <WarriorButton/>
                </button>
                <button 
                    className="upgrade-castle-button"
                    onMouseOver={() => this.showCost()}
                    onMouseOut={() => this.hideCost()}
                >
                    <CastleUpgradeButton/>
                </button>
                <div className="castle-manage-panel-back"/>
            </div>
        );
    }
}