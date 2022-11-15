import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import GameOverWindow from "./gameOverWindow/GameOverWindow"

export default function GameOver(props) {
    const windowState = props.windowState;
    const [gameOverWindowState, setGameOverWindowState] = useState(windowState);

    const navigate = useNavigate();
    const routes = useSelector((state) => state.routes.value);
    const server = useSelector((state) => state.server.value);

    /* Запрос на сервер на логаут. */
    async function sendUserLogout() {
        return await server.logout();
    }

    /* Рестарт гейм на сервере.
        Запросы на сервер на обнуление даты юзера.
        А именно: сброс голды, удаление замка и пр.
    */
    async function sendUserRestart(){
        // TODO
    }


    /* Логаут пользователя на фронте. */
    function userLogout(event){
        // console.log(event)

        setGameOverWindowState({isOpened: false})
        
        // TODO: change to setInterval() (need a better Server.js)
        setTimeout(() => {
            if(sendUserLogout()) {
                return navigate(routes.Login.path)        
            }
        }, 500);
    }

    /* Рестарт гейм на фронте. */
    function restartGame(event){
        // console.log(event);

        setGameOverWindowState({isOpened: false})
        // ...
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