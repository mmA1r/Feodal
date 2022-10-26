import React from "react";

import Logout from './logout/Logout';
import Chat from "./chat/Chat";
import Game from "./game/Game";

import './gamePage.scss'

export default class GamePage extends React.Component {
    constructor(props) {
        super(props);
        const { navigate } = props;
        this.navigate = navigate;
    }
    
    render() {
        return(
            <div className="game">
                <Logout navigate={this.navigate}></Logout>
                <Chat/>
                <Game/>
            </div>
        );
    }
}