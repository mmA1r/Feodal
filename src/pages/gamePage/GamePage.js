import React, { useEffect } from "react";
import { useDispatch, useStore } from 'react-redux';

import Logout from './logout/Logout';
import Chat from "./chat/Chat";
import MiniMapFrame from "./miniMapFrame/MiniMapFrame";
import CastleButton from "./castleButton/CastleButton";
import UI from "./UI/UI";
import GamerMoney from "./gamerMoney/GamerMoney";
import Game from './game/Game';
import GameOver from './gameOver/GameOver'

import { hide, castle } from '../../store/features/storeInterface/storeInterface';

import './gamePage.scss';

export default function GamePage() {
    const dispatch = useDispatch();

    const store = useStore();

    useEffect(() => {
        return () => {

        }
    }, []);

    function openInterface() {
        if(store.getState().interface.value === 'castle') {
            return dispatch(hide());
        }
        return dispatch(castle());
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
                <MiniMapFrame></MiniMapFrame>
            </div>
            <UI/>
            <Logout></Logout>
            <GamerMoney/>
            <Chat/>
            <Game/>
            <GameOver
                windowState = {{isOpened: true}}
            />
        </div>
    );
}