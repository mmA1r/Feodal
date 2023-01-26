import React, { useEffect } from "react";
import { useSelector, useStore } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Logout from './logout/Logout';
import Chat from "./chat/Chat";
import MiniMapFrame from "./miniMapFrame/MiniMapFrame";
import CastleButton from "./castleButton/CastleButton";
import UI from "./UI/UI";
import GamerMoney from "./gamerMoney/GamerMoney";
import Game from './game/Game';
import GameOver from "./gameOver/GameOver";
import HintHover from "./hintHover/HintHover";

import StoreLoader from "../../store/StoreLoader";


import './gamePage.scss';

export default function GamePage() {

    const forceRender = useSelector((state) => state.reRender.value);
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
    });

    async function getUnitsTypes() {
        const units = await server.getUnitsTypes();
        if(units) {
            units.forEach(type => {
                if(type.id-0 === 1) {
                    storeLoader.loadToStore({
                        hp: type.hp,
                        cost: type.cost,
                        damage: type.damage,
                        speed: type.speed,
                        might: type.might
                    }, 'soldier');
                } else if(type.id-0 === 2) {
                    storeLoader.loadToStore({
                        hp: type.hp,
                        cost: type.cost,
                        damage: type.damage,
                        speed: type.speed,
                        might: type.might
                    }, 'assassin');
                }
            });
        }
    }
    
    function openInterface() {
        if(store.getState().interface.value.castle) {
            return storeLoader.loadToStore('hide', 'ui');
        }
        return storeLoader.loadToStore('castle', 'ui');
    }

    function showHint(e) {
        return storeLoader.loadToStore({
            state: true,
            type: 'castleUI',
            top: e.pageY, 
            left: e.pageX
        }, 'hint');
    }

    function hideHint() {
        return storeLoader.loadToStore({
            state: false,
            type: null,
            top: 2000, 
            left: 0
        }, 'hint');
    }

    return(
        <div key={forceRender} className="game">
            <div className="mini-map-window">
                <button
                    className="castle-manage-button"
                    onClick={() => {
                        openInterface();
                        store.getState().changeStoreFlag.function()}}
                    onMouseEnter={(e) => showHint(e)}
                    onMouseLeave={() => hideHint()}
                >
                    <CastleButton/>
                </button>
                <MiniMapFrame/>
            </div>
            <GameOver/>
            <UI/>
            <Logout></Logout>
            <HintHover/>
            <GamerMoney/>
            <Chat/>
            <Game/>
        </div>
    );
}