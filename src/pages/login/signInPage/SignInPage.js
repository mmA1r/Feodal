import React from "react";

import store from '../../../store/store';
import LoginButton from "../components/loginButton/LoginButton";
import AngleLogo from "../components/angleLogo/AngleLogo";
import LoginHeader from '../components/loginHeader/LoginHeader';
import LoginInput from "../components/loginInput/LoginInput";

import "./signInPage.scss";

export default class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        const { navigate } = props;
        this.navigate = navigate;
        this.routes = store.getState().routes.value;
        this.server = store.getState().server.value;

        this.login = React.createRef();
        this.password = React.createRef();

        this.inputs = {
            login: this.login,
            password: this.password
        }

        this.state = {
            hide: 'effect-hide',
            invalidMessage: false
        }

        this.style = 'login-style';
    }

    //-----------------Отпраляет запрос серваку(логин) и в случае если ответ прилетел
    //-----------------Перенаправляет пользователя на страницу игры
    async signIn() {
        const login = this.login.current.value;
        const password = this.password.current.value;
        const data = await this.server.login(login, password);

        if(data) {
            this.setState({ hide: 'effect-shows' });
            setTimeout(() => {
                return this.navigate(this.routes.Game.path);
            }, 1500);
        } else {
            return this.showInvalidMessage();
        }
    }

    showInvalidMessage() {
        this.setState({ invalidMessage: true });
        setTimeout(() => {
            this.setState({ invalidMessage: false });
        }, 2000);
    }
    
    //-----------------Перемещает На страницу регистрации
    routeToSignUp() {
        return this.navigate(this.routes.Registration.path);
    }

    render() {
        return(
            <div className="login-window">
                <div className={`logo top-right ${ this.state.hide }`}></div>
                <div className={`logo top-left ${ this.state.hide }`}></div>
                <div className={`logo bottom-right ${ this.state.hide }`}></div>
                <div className={`logo bottom-left ${ this.state.hide }`}></div>
                <AngleLogo/>
                <div className="auth-window">
                    <div className={`logo-above ${ this.state.hide }`}></div>
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
                    <div className={`invalid-message ${this.state.invalidMessage ? 'invalid-show' : 'invalid-hide'}`}>*invalid login or password</div>
                    <div className="button-box">
                        <LoginButton
                            onClick={() => this.signIn()}
                            className={"login-game-button"}
                            text={'Sing In'}
                        />
                        <LoginButton
                            onClick={() => this.routeToSignUp()}
                            className={"sign-up-button"}
                            text={'Sing Up'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}