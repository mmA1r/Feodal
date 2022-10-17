import React from "react";

import AngleLogo from "../angleLogo/AngleLogo";
import LoginHeader from '../loginHeader/LoginHeader';
import LoginInput from "../loginInput/LoginInput";

import './signUp.scss';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        const { ROUTES, navigate } = props;
        this.routes = ROUTES;
        this.navigate = navigate;

        this.login = React.createRef();
        this.password = React.createRef();
        this.name = React.createRef();

        this.inputs = {
            name: this.name,
            login: this.login,
            password: this.password,
        }

        this.style = 'registration-style';
    }

    async signUp() {
        // const name = this.name.current.value
        // const login = this.login.current.value;
        // const password = this.password.current.value;
        // await this.server.registration(login, password);

        if(true) {
            return this.routeToSignIn();
        }
    }

    routeToSignIn() {
        return this.navigate(this.routes.Login.path);
    }

    render() {
        return(
            <div className="registration-window">
                <AngleLogo/>
                <div className="newcomer-window">
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
                            className="registration-button"
                            onClick={() => this.signUp()}
                        >Sign Up</button>
                        <button 
                            className="sign-in-button"
                            onClick={() => this.routeToSignIn()}
                        >Already Sign Up? Sign In.</button>
                    </div>
                </div>
            </div>
        );
    }
}