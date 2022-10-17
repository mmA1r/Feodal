import React from "react";

import Logout from './logout/Logout';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        const { ROUTES, navigate } = props;
        this.routes = ROUTES;
        this.navigate = navigate;
    }
    
    render() {
        return(
            <div>
                <Logout ROUTES={this.routes} navigate={this.navigate}></Logout>
            </div>
        );
    }
}