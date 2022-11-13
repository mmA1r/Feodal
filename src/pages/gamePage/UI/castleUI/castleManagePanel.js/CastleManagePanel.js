import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Money from "./money/Money";
import WarriorButton from "./manageButtons/warriorButton/WarriorButton";
import CastleUpgradeButton from "./manageButtons/castleUpgradeButton/CastleUpgradeButton";

import './castleManagePanel.scss';

export default function CastleManagePanel() {
    const server = useSelector((state) => state.server.value);

    const [price, setPrice] = useState(false);
    // eslint-disable-next-line
    const [unit, setUnit] = useState('soldier');

    let units = [];
    let cost = 0;


    
    useEffect(() => {
        getUnitsTypes();
        // eslint-disable-next-line
    }, []);

    async function getUnitsTypes() {
        return units = await server.getUnitsTypes();
    }

    const showCost = (unitName = 0) => {
        units.forEach(unit => {
            if(unit.name === unitName) {
                return cost = unit.cost;
            } else  {
                cost = 0;
            }
        });
        setPrice(true);
        setUnit(unitName);
    }

    const hideCost = () => {
        return setPrice(false);
    }

    return (
        <div className="castle-manage-panel">
            <div className={`price ${price ? 'show-price' : 'hide-price'}`}>
                <Money/>
                <span className="price-num">{cost}</span>
            </div>
            <button
                className="buy-warrior-unit-button"
                onMouseOver={() => showCost("soldier")}
                onMouseOut={() => hideCost()}
            >
                <WarriorButton/>
            </button>
            <button 
                className="upgrade-castle-button"
                onMouseOver={() => showCost()}
                onMouseOut={() => hideCost()}
            >
                <CastleUpgradeButton/>
            </button>
            <div className="castle-manage-panel-back"/>
        </div>
    );
}