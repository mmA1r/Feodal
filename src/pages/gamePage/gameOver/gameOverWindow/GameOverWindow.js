import React from "react"

import LogoutButton from "./logoutButton/LogoutButton";
import RestartGameButton from "./restartGameButton/RestartGameButton";
import GameOverWindowDecorations from "./gameOverWindowDecorations/GameOverWindowDecorations";
import './gameOverWindow.scss'

export default function GameOverWindow(props) {

    return(
        <div className="game-over-window">
            <GameOverWindowDecorations
                borders = { true }
                corners = { true }
            ></GameOverWindowDecorations>

            <div className="game-over-text-box">{props.title}</div>
            <div className="game-over-buttons-box">
                <LogoutButton
                    title = {props.buttons.logoutButton.title}
                    onClickHandler = {props.callbacks.userLogout}
                ></LogoutButton>

                <RestartGameButton
                    title = {props.buttons.restartGameButton.title}
                    onClickHandler = {props.callbacks.restartGame}
                ></RestartGameButton>
            </div>
        </div>
    );
}