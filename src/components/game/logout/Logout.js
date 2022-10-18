import React from "react";

import Server from "../../server/Server";

import './logout.scss'

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        const { ROUTES, navigate } = props;
        this.routes = ROUTES;
        this.navigate = navigate;
        this.server = new Server();
    }

    async killUser() {
        return await this.server.logout();
    }

    logout() {
        const isKill = this.killUser();
        if(isKill) {
            return this.navigate(this.routes.Login.path);
        }
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