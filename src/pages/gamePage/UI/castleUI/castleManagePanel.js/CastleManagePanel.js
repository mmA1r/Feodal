import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { soldierValues } from "../../../../../store/features/units/soldier";

import Money from "./money/Money";
import WarriorButton from "./manageButtons/warriorButton/WarriorButton";
import CastleUpgradeButton from "./manageButtons/castleUpgradeButton/CastleUpgradeButton";

import './castleManagePanel.scss';

export default function CastleManagePanel() {
    const server = useSelector((state) => state.server.value);
    const dispatch = useDispatch();

    const [price, setPrice] = useState(false);
    const [unitPrice, setUnitPrice] = useState(0);
    const [units, setUnits] = useState([]);

    let soldierCost;

    units.forEach(type => {
        if(type.name === 'soldier') {
            dispatch(soldierValues({
                hp: type.hp,
                cost: type.cost,
                damage: type.damage,
                speed: type.speed
            }));
            return soldierCost = type.cost;
        }
    });


    
    useEffect(() => {
        getUnitsTypes();
        // eslint-disable-next-line
    }, []);

    async function getUnitsTypes() {
        return setUnits(await server.getUnitsTypes());
    }

    const showCost = (unitName) => {
        if(unitName === 'soldier') {
            setUnitPrice(soldierCost);
        } else {
            setUnitPrice(0);
        }
        setPrice(true);
    }

    const hideCost = () => {
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