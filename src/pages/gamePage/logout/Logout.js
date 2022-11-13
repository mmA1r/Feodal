import React, { useState } from "react";

import ConfirmWindow from "./confirmWindow/ConfirmWindow";
import LogoutIcon from "./logoutIcon/LogoutIcon";

import './logout.scss'

export default function Logout() {
    const [confirmWindow, setConfirmWindow] = useState();

    //--------------Создает окошко подтверждения логаута
    const openConfirmWindow = (state) => {
        setConfirmWindow(state);
    }

    return(
        <div className="logout-box">
            <button 
                className="logout-button"
                onClick={() => openConfirmWindow(true)}
            >
                <LogoutIcon/>
            </button>
            { 
                confirmWindow ? 
                    <ConfirmWindow 
                        openConfirmWindow={() => openConfirmWindow()}
                    ></ConfirmWindow> 
                : '' 
            }
        </div>
    );
}