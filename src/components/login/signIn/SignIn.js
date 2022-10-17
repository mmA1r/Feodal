import React from "react";

import Server from "../../server/Server";
import AngleLogo from "../angleLogo/AngleLogo";
import LoginHeader from '../loginHeader/LoginHeader';
import LoginInput from "../loginInput/LoginInput";

import "./signIn.scss";

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        const { ROUTES, navigate } = props;
        this.routes = ROUTES;
        this.navigate = navigate;

        this.server = new Server();
        this.login = React.createRef();
        this.password = React.createRef();

        this.inputs = {
            login: this.login,
            password: this.password
        }

        this.style = 'login-style';
    }

    async signIn() {
        const login = this.login.current.value;
        const password = this.password.current.value;
        await this.server.login(login, password);

        if(true) {
            return this.navigate(this.routes.Game.path);
        }
    }

    routeToSignUp() {
        return this.navigate(this.routes.Registration.path);
    }

    render() {
        return(
            <div className="login-window">
                <AngleLogo/>
                <div className="auth-window">
                    <LoginHeader/>
                    {Object.keys(this.inputs).map((key) => {
                        return (
                            <LoginInput
                                key={key}
                                type={`${key}`} 
                                inputLink={this.inputs}
                                style={this.style}
                            />
                        );
                    })}
                    <div className="button-box">
                        <button 
                            className="login-game-button"
                            onClick={() => this.signIn()}
                        >Sing In</button>
                        <button 
                            className="sign-up-button"
                            onClick={() => this.routeToSignUp()}
                        >Sing Up</button>
                    </div>
                </div>
            </div>
        );
    }
}