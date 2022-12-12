import React, { useEffect } from "react";
import { useStore } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Logout from './logout/Logout';
import Chat from "./chat/Chat";
import MiniMapFrame from "./miniMapFrame/MiniMapFrame";
import CastleButton from "./castleButton/CastleButton";
import UI from "./UI/UI";
import GamerMoney from "./gamerMoney/GamerMoney";
import Game from './game/Game';

import StoreLoader from "../../store/StoreLoader";


import './gamePage.scss';

export default function GamePage() {

    const store = useStore();
    const navigate = useNavigate();
    const routes = store.getState().routes.value;
    const server = store.getState().server.value;
    const storeLoader = new StoreLoader();

    useEffect(() => {
        getUnitsTypes();
        if(!localStorage.getItem('token')) {
            return navigate(routes.Login.path);
        }
        window.addEventListener("contextmenu", e => e.preventDefault());
        // eslint-disable-next-line
    }, []);

    async function getUnitsTypes() {
        const units = await server.getUnitsTypes();
        if(units) {
            units.forEach(type => {
                storeLoader.loadToStore({
                    hp: type.hp,
                    cost: type.cost,
                    damage: type.damage,
                    speed: type.speed,
                    might: type.might
                }, 'soldier');
            });
        }
    }
    
    function openInterface() {
        if(store.getState().interface.value.castle) {
            return storeLoader.loadToStore('hide', 'ui');
        }
        return storeLoader.loadToStore('castle', 'ui');
    }

    return(
        <div className="game">
            <div className="mini-map-window">
                <button
                    className="castle-manage-button"
                    onClick={() => openInterface()}
                >
                    <CastleButton></CastleButton>
                </button>
                <MiniMapFrame/>
            </div>
            <UI/>
            <Logout></Logout>
            <GamerMoney/>
            <Chat/>
            <Game/>
        </div>
    );
}