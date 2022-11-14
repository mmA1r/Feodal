import React, { useState } from "react"

import GameOverWindow from "./gameOverWindow/GameOverWindow";

export default function GameOver(props) {
    const windowState = props.windowState;    
    const [gameOverWindowState, setGameOverWindowState] = useState(windowState)

    async function userLogout(event){
        setGameOverWindowState({isOpened: false})
        // user logout

        // console.log(event)
        // console.log('last gameOverWindowState:', gameOverWindowState)
        return true;
    }

    function restartGame(event){
        setGameOverWindowState({isOpened: false})
        // restart game

        // console.log(event);
        // console.log('last gameOverWindowState:', gameOverWindowState)
        return true;
    }

    return(<div>
        {  gameOverWindowState.isOpened ?
            <GameOverWindow
                title = 'GAME OVER'
                buttons = {{
                    logoutButton: {title: 'Logout',},
                    restartGameButton: {title : 'Restart Game'}
                }}
                callbacks = {{
                    userLogout: userLogout,
                    restartGame: restartGame
                }}
            ></GameOverWindow>
        : '' }
        </div>
    );
}