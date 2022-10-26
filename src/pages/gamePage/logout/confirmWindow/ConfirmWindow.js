import React from "react";

import store from '../../../../store/store';

import YesButton from "./yesButton/YesButton";
import NoButton from "./noButton/NoButton";
import ConfirmBorder from "./confirmBorder/ConfirmBorder";

import './confirmWindow.scss'

export default class ConfirmWindow extends React.Component {
    constructor(props) {
        super(props);
        const { openConfirmWindow, navigate } = props;
        this.navigate = navigate;
        this.openConfirmWindow = openConfirmWindow;
        
        this.routes = store.getState().routes.value;
        this.server = store.getState().server.value;

        this.shadeBlock = React.createRef();
    }

    //-------------Запрос на логаут
    async logoutUser() {
        return await this.server.logout();
    }

    //-------------логаут пользователя
    confirmLogout() {
        this.shadeBlock.current.classList.add('disappearing');
        setTimeout(() => {
            if(this.logoutUser()) {
                return this.navigate(this.routes.Login.path);
            }
        }, 500);
    }

    //--------------Закрывает окно логаута
    return() {
        this.shadeBlock.current.classList.add('disappearing');
        setTimeout(() => {
            this.openConfirmWindow(false);
        }, 500)
    }

    render() {
        return(
            <div className="shade-block" ref={ this.shadeBlock }>
                <div className="confirm-logout-window">
                    <ConfirmBorder side={'left-side'}/>
                    <ConfirmBorder side={'right-side'}/>
                    <div className="confirm-button-box">
                        <button 
                            className="agree-button"
                            onClick={() => this.confirmLogout()}
                        >
                            <YesButton/>
                        </button>
                        <button
                            className="disagree-button"
                            onClick={() => this.return()}
                        >
                            <NoButton/>
                        </button>
                    </div>
                    <div className="back-confirm-window">
                        <div className="text-confirm-window">Are you sure you want to logout?</div>
                    </div>
                </div>
            </div>
        );
    }
}