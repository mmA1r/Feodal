import React from "react";

import Server from "../server/Server";

import './logout.css'

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.server = new Server();
    }

    async logout() {
        await this.server.logout();
    }

    render() {
        return(
            <div className="logout-box">
                <button 
                    className="logout-button"
                    onClick={() => this.logout()}
                >Logout</button>
            </div>
        );
    }
}