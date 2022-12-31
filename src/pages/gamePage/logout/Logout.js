import React, { useState } from "react";

import ConfirmWindow from "./confirmWindow/ConfirmWindow";
import StoreLoader from "../../../store/StoreLoader";
import LogoutIcon from "./logoutIcon/LogoutIcon";

import './logout.scss'

export default function Logout() {
    const [confirmWindow, setConfirmWindow] = useState();

    const store = new StoreLoader();

    //--------------Создает окошко подтверждения логаута
    const openConfirmWindow = (state) => {
        setConfirmWindow(state);
    }

    function showHint(e) {
        return store.loadToStore({
            state: true,
            type: 'logout',
            top: e.pageY, 
            left: e.pageX
        }, 'hint');
    }

    function hideHint() {
        return store.loadToStore({
            state: false,
            type: null,
            top: 2000, 
            left: 0
        }, 'hint');
    }

    return(
        <div className="logout-box">
            <button 
                className="logout-button"
                onClick={() => openConfirmWindow(true)}
                onMouseEnter={(e) => showHint(e)}
                onMouseLeave={() => hideHint()}
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