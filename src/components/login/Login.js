import React from "react";

import Server from "../server/Server";

import "./login.css";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.server = new Server();
        this.login = React.createRef();
        this.password = React.createRef();
    }

    async sendLogin() {
        const login = this.login.current.value;
        const password = this.password.current.value;

        await this.server.login(login, password);
    }
    
    async singUp() {
        await this.server.registration();
    }

    render() {
        return(
            <div className="auth-window">
                <div className="login">
                    <input 
                        ref={this.login}
                        className="auth-input login-input"
                        type='text' 
                        id='login' 
                        placeholder='login'
                        required
                    />
                    <label htmlFor="login" className="input-label login-label">Login</label>
                </div>
                <div className="password">
                    <input 
                        ref={this.password}
                        type='password' 
                        id='password' 
                        placeholder='password' 
                        className="auth-input password-input"
                        required
                    />
                    <label htmlFor="password" className="input-label password-label">Password</label>
                </div>
                <div className="sign-in-up-box">
                    <button 
                        className="sing-in"
                        onClick={() => this.sendLogin()}
                    >Sing In</button>
                    <button 
                        className="sing-up"
                        onClick={() => this.singUp()}
                    >Sing Up</button>
                </div>
            </div>
        );
    }
}