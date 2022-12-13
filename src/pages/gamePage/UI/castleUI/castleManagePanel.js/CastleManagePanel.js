import React, { useState } from "react";
import { useSelector, useStore } from "react-redux";

import Money from "./money/Money";
import WarriorButton from "./manageButtons/warriorButton/WarriorButton";
import AssassinWarriorButton from "./manageButtons/assassinWarriorButton/AssassinWarriorButton";
import CastleUpgradeButton from "./manageButtons/castleUpgradeButton/CastleUpgradeButton";
import UnitsOutButton from "./manageButtons/unitsOutButton/UnitsOutButton";
import LockedButton from "./manageButtons/lockedButton/LockedButton";
import StoreLoader from "../../../../../store/StoreLoader";


import './castleManagePanel.scss';

export default function CastleManagePanel() {
    const server = useSelector((state) => state.server.value);
    const upgradeCastleCost = useSelector((state) => state.gamer.upadateLevelCost);
    const gamerLevel = useSelector((state) => state.gamer.level);
    const soldierCost = useSelector((state) => state.soldier.cost);
    const assassinCost = useSelector((state) => state.assassin.cost);

    const store = new StoreLoader();

    const [price, setPrice] = useState(false);
    const [unitPrice, setUnitPrice] = useState(0);

    async function buySoldier() {
        await server.buyUnit(1);
        const castleMoney = (await server.getCastle()).money-0;
        store.loadToStore({ money: castleMoney }, 'gamer');
    }

    async function buyAssassin() {
        await server.buyUnit(2);
        const castleMoney = (await server.getCastle()).money-0;
        store.loadToStore({ money: castleMoney }, 'gamer');
    }

    async function upgradeCastle() {
        const response = await server.upgradeCastle();
        const castle = await server.getCastle();
        const castleMoney = castle.money-0;
        const castleUpgradeCost = castle?.castleUpgradeCost-0;
        if(response) {
            store.loadToStore({ money: castleMoney, castleUpdateCost: castleUpgradeCost, level: gamerLevel+1 }, 'gamer');

        }
        setUnitPrice(castleUpgradeCost);
    }

    function showCost(unitName) {
        if(unitName === 'castle') {
            if(gamerLevel === 5) {
                setUnitPrice('max');
            } else {
                setUnitPrice(upgradeCastleCost);
            }
        } else if(unitName === 'soldier') {
            setUnitPrice(soldierCost);
        } else if(unitName === 'assassin') {
            setUnitPrice(assassinCost);
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
            { gamerLevel < 2 ? 
                <button
                    className="assassin-warrior-button"
                    onMouseEnter={() => showCost('assassin')}
                    onMouseLeave={() => hideCost()}
                    onClick={() => buyAssassin()}
                    disabled
                >
                    <LockedButton/>
                </button>
            : 
                <button
                    className="assassin-warrior-button"
                    onMouseEnter={() => showCost('assassin')}
                    onMouseLeave={() => hideCost()}
                    onClick={() => buyAssassin()}
                >
                    <AssassinWarriorButton/>
                </button>
            }
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