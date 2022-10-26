import React from "react";

import store from "../../store/store";

import './notFoundPage.scss';

export default class NotFoundPage extends React.Component {
    constructor(props) {
        super(props);
        const { navigate } = props;
        this.navigate = navigate;
        this.routes = store.getState().routes.value;
    }

    returnHomePage() {
        return this.navigate(this.routes.Login.path);
    }

    render() {
        return(
            <div className="not-found-page">
                <div className="to-home-page">
                    <p className="error-code">404</p>
                    <p className="link-home-text">page not found.</p>
                    <p className="link-home-text">
                        Let`s go <button 
                            className="return-home"
                            onClick={() => this.returnHomePage()}
                        >home</button>, wanderer
                    </p>
                </div>
            </div>
        );
    }
}