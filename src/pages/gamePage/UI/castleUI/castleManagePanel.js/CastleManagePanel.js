import React, { useState } from "react";
import { useSelector, useStore } from "react-redux";

import Money from "./money/Money";
import WarriorButton from "./manageButtons/warriorButton/WarriorButton";
import CastleUpgradeButton from "./manageButtons/castleUpgradeButton/CastleUpgradeButton";
import UnitsOutButton from "./manageButtons/unitsOutButton/UnitsOutButton";
import StoreLoader from "../../../../../store/StoreLoader";


import './castleManagePanel.scss';

export default function CastleManagePanel() {
    const server = useSelector((state) => state.server.value);
    const upgradeCastleCost = useSelector((state) => state.gamer.upadateLevelCost);
    const soldierCost = useSelector((state) => state.soldier.cost);

    const store = new StoreLoader();

    const [price, setPrice] = useState(false);
    const [unitPrice, setUnitPrice] = useState(0);

    async function buySoldier() {
        await server.buyUnit(1);
        const castleMoney = (await server.getCastle()).money-0;
        store.loadToStore({ money: castleMoney }, 'gamer');
    }

    async function upgradeCastle() {
        const castleMoney = (await server.upgradeCastle()).money-0;
        console.log(castleMoney);
        const castleLevel = (await server.getCastle()).level-0;
        store.loadToStore({ money: castleMoney, level: castleLevel }, 'gamer');
    }

    function showCost(unitName) {
        if(unitName === 'castle') {
            setUnitPrice(upgradeCastleCost);
        } else if(unitName === 'soldier') {
            setUnitPrice(soldierCost);
        } else {
            setUnitPrice(0);
        }
        setPrice(true);
    }

    function hideCost() {
        return setPrice(false);
    }

    return (
        <div className="castle-manage-panel">
            <div className={`price ${price ? 'show-price' : 'hide-price'}`}>
                <Money/>
                <span className="price-num">{unitPrice}</span>
            </div>
            <button
                className="buy-warrior-unit-button"
                onMouseEnter={() => showCost("soldier")}
                onMouseLeave={() => hideCost()}
                onClick={() => buySoldier()}
            >
                <WarriorButton/>
            </button>
            <UnitsOutButton/>
            <button 
                className="upgrade-castle-button"
                onMouseEnter={() => showCost('castle')}
                onMouseLeave={() => hideCost()}
                onClick={() => upgradeCastle()}
            >
                <CastleUpgradeButton/>
            </button>
            <div className="castle-manage-panel-back"/>
        </div>
    );
}