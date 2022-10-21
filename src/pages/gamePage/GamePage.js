import React from "react";
import Chat from "./chat/Chat";

import Logout from './logout/Logout';

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
            </div>
        );
    }
}