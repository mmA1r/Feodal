import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import YesButton from "./yesButton/YesButton";
import NoButton from "./noButton/NoButton";
import ConfirmBorder from "./confirmBorder/ConfirmBorder";

import './confirmWindow.scss'

export default function ConfirmWindow(props) {
        const { openConfirmWindow } = props;

        const navigate = useNavigate();
        const routes = useSelector((state) => state.routes.value);
        const server = useSelector((state) => state.server.value);

        const shadeBlock = useRef();

    //-------------Запрос на логаут
    async function logoutUser() {
        return await server.logout();
    }

    //-------------логаут пользователя
    const confirmLogout = () => {
        shadeBlock.current.classList.add('disappearing');
        setTimeout(() => {
            if(logoutUser()) {
                return navigate(routes.Login.path);
            }
        }, 500);
    }

    //--------------Закрывает окно логаута
    const closeLogoutWindow = () => {
        shadeBlock.current.classList.add('disappearing');
        setTimeout(() => {
            openConfirmWindow(false);
        }, 500)
    }

    return(
        <div className="shade-block" ref={ shadeBlock }>
            <div className="confirm-logout-window">
                <ConfirmBorder side={'left-side'}/>
                <ConfirmBorder side={'right-side'}/>
                <div className="confirm-button-box">
                    <button 
                        className="agree-button"
                        onClick={() => confirmLogout()}
                    >
                        <YesButton/>
                    </button>
                    <button
                        className="disagree-button"
                        onClick={() => closeLogoutWindow()}
                    >
                        <NoButton/>
                    </button>
                </div>
                <div className="back-confirm-window">
                    <div className="text-confirm-window">Вы правда хотите выйти?</div>
                </div>
            </div>
        </div>
    );
}