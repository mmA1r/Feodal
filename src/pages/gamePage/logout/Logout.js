import React from "react";

import store from '../../../store/store';

import './logout.scss'

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        const { navigate } = props;
        this.navigate = navigate;
        this.routes = store.getState().routes.value;
        this.server = store.getState().server.value;

        this.logoutButton = React.createRef();

        this.state = {
            confirm: false
        }
    }

    //---------Запрос на логаут
    async logoutUser() {
        return await this.server.logout();
    }

    //---------Создает окошко подтверждения выхода
    createConfirmLogoutWindow() {
        const button = this.logoutButton.current;
        const blockMainScreen = document.createElement('div');
        const confirmWindow = document.createElement('div');
        const agree = document.createElement('button');
        const disagree = document.createElement('button');
        const text = document.createElement('div');

        blockMainScreen.className = 'shade-block';
        confirmWindow.className = 'confirm-logout-window';
        agree.className = 'agree-button';
        agree.textContent = 'Yes';
        disagree.classList = 'disagree-button';
        disagree.textContent = 'No';
        text.classList = 'text-confirm-widnow';
        text.textContent = 'Are you sure you want to logout?';

        button.appendChild(blockMainScreen);
        blockMainScreen.appendChild(confirmWindow);
        confirmWindow.appendChild(text);
        confirmWindow.appendChild(agree);
        confirmWindow.appendChild(disagree);

        //----------залогаутиться
        agree.onclick = () => {
            blockMainScreen.classList.add('disappearing');
            setTimeout(() => {
                return this.logout();
            }, 500)
        }
        //----------закрыть окно логаута
        disagree.onclick = () => {
            blockMainScreen.classList.add('disappearing');
            setTimeout(() => {
                return blockMainScreen.remove();
            }, 500)
        }
    }

    //---------Проверяет пришел ли ответ и логаутит в этом случае
    logout() {
        if(this.logoutUser()) {
            return this.navigate(this.routes.Login.path);
        }
    }

    render() {
        return(
            <div className="logout-box" ref={ this.logoutButton }>
                <button 
                    className="logout-button"
                    onClick={() => this.createConfirmLogoutWindow()}
                >Logout</button>
            </div>
        );
    }
}