import React from "react";

import store from '../../../store/store';
import LoginButton from "../components/loginButton/LoginButton";
import AngleLogo from "../components/angleLogo/AngleLogo";
import LoginHeader from '../components/loginHeader/LoginHeader';
import LoginInput from "../components/loginInput/LoginInput";

import './signUpPage.scss';

export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        const { navigate } = props;
        this.navigate = navigate;
        this.routes = store.getState().routes.value;
        this.server = store.getState().server.value;

        this.login = React.createRef();
        this.password = React.createRef();
        this.name = React.createRef();

        this.state = {
            hide: 'effect-hide'
        }

        this.inputs = {
            name: this.name,
            login: this.login,
            password: this.password,
        }

        this.style = 'registration-style';
    }

    //-----------------Отпраляет запрос серваку(регистрация) и в случае если ответ прилетел
    //-----------------Перенаправляет пользователя на страницу логина
    async signUp() {
        const name = this.name.current.value
        const login = this.login.current.value;
        const password = this.password.current.value;
        const data = await this.server.registration(name, login, password);
        if(data) {
            this.setState({ hide: 'effect-shows' });
            setTimeout(() => {
                return this.routeToSignIn();
            }, 1500);
        }
    }

    //-----------------Перемещает На страницу логина
    routeToSignIn() {
        return this.navigate(this.routes.Login.path);
    }

    render() {
        return(
            <div className="registration-window">
                <div className={`logo top-right ${ this.state.hide }`}></div>
                <div className={`logo top-left ${ this.state.hide }`}></div>
                <div className={`logo bottom-right ${ this.state.hide }`}></div>
                <div className={`logo bottom-left ${ this.state.hide }`}></div>
                <AngleLogo/>
                <div className="newcomer-window">
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
                    <div className="button-box">
                        <LoginButton
                            onClick={() => this.signUp()}
                            className={"registration-button"}
                            text={'Sign Up'}
                        />
                        <LoginButton
                            onClick={() => this.routeToSignIn()}
                            className={"sign-in-button"}
                            text={'Already Sign Up? Sign In.'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}