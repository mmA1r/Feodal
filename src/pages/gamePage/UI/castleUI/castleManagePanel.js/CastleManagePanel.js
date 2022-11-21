import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import StoreLoader from "../../../../../store/StoreLoader";
import Money from "./money/Money";
import WarriorButton from "./manageButtons/warriorButton/WarriorButton";
import CastleUpgradeButton from "./manageButtons/castleUpgradeButton/CastleUpgradeButton";
import UnitsOutButton from "./manageButtons/unitsOutButton/UnitsOutButton";

import './castleManagePanel.scss';

export default function CastleManagePanel() {
    const server = useSelector((state) => state.server.value);
    const castleLevel = useSelector((state) => state.gamer.level);
    const storeLoader = new StoreLoader();

    const [price, setPrice] = useState(false);
    const [unitPrice, setUnitPrice] = useState(0);
    const [unitsTypes, setUnitsTypes] = useState([]);

    let castleUpgradeCost;
    let soldierCost;

    useEffect(() => {
        getUnitsTypes();
        // eslint-disable-next-line
    }, []);

    async function getUnitsTypes() {
        return setUnitsTypes(await server.getUnitsTypes());
    }

    async function buySoldier() {
        return await server.buyUnit(1);
    }

    async function upgradeCastle() {
        return await server.upgradeCastle();
    }

    unitsTypes.forEach(type => {
        if(type.name === 'soldier') {
            storeLoader.loadToStore({
                hp: type.hp,
                cost: type.cost,
                damage: type.damage,
                speed: type.speed
            }, 'soldier');
            return soldierCost = type.cost;
        }
    });

    if(castleLevel === 1) {
        castleUpgradeCost = 1000;
    } else if(castleLevel === 2) {
        castleUpgradeCost = 2000;
    } else if(castleLevel === 3) {
        castleUpgradeCost = 3000;
    } else if(castleLevel === 4) {
        castleUpgradeCost = 4000;
    } else if(castleLevel === 5) {
        castleUpgradeCost = 5000;
    }

    function showCost(unitName) {
        if(unitName === 'castle') {
            setUnitPrice(castleUpgradeCost)
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
                onMouseOver={() => showCost("soldier")}
                onMouseOut={() => hideCost()}
                onClick={() => buySoldier()}
            >
                <WarriorButton/>
            </button>
            <UnitsOutButton/>
            <button 
                className="upgrade-castle-button"
                onMouseOver={() => showCost('castle')}
                onMouseOut={() => hideCost()}
                onClick={() => upgradeCastle()}
            >
                <CastleUpgradeButton/>
            </button>
            <div className="castle-manage-panel-back"/>
        </div>
    );
}