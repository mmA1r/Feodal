import React from "react";

import Server from "../../server/Server";

import './logout.css'

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        const { ROUTES, navigate } = props;
        this.routes = ROUTES;
        this.navigate = navigate;
        this.server = new Server();
    }

    async killUser() {
        await this.server.logout();
    }

    logout() {
        this.killUser();
        return this.navigate(this.routes.Login.path);
    }

    render() {
        console.log(this.props)
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