import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginButton from "../components/loginButton/LoginButton";
import AngleLogo from "../components/angleLogo/AngleLogo";
import LoginHeader from '../components/loginHeader/LoginHeader';
import LoginInput from "../components/loginInput/LoginInput";

import "./signInPage.scss";

export default function SignInPage() {

    const navigate = useNavigate();
    const routes = useSelector((state) => state.routes.value);
    const server = useSelector((state) => state.server.value);

    const [visible, setVisible] = useState('effect-hide');
    const [messageStatus, setMessagesStatus] = useState(false);
    const [emptyString, setemptyString] = useState(false);

    const login = useRef();
    const password = useRef();

    const inputs = {
        login: login,
        password: password
    }
    const style = 'login-style';

    //-----------------Отпраляет запрос серваку(логин) и в случае если ответ прилетел
    //-----------------Перенаправляет пользователя на страницу игры
    async function signIn() {
        const loginValue = login.current.value;
        const passwordValue = password.current.value;

        if(loginValue && passwordValue) {
            const data = await server.login(loginValue, passwordValue);

            if(data) {
                setVisible('effect-shows');
                setTimeout(() => {
                    return navigate(routes.Game.path);
                }, 1500);
            } else {
                return showInvalidMessage();
            }
        } else {
            setemptyString(true);
            const returnEmptyString = setTimeout(() => {
                setemptyString(false);
                clearTimeout(returnEmptyString);
            }, 2000);
        }
    }

    const showInvalidMessage = () => {
        setMessagesStatus(true);
        login.current.value = '';
        password.current.value = ''; 
        setTimeout(() => {
            setMessagesStatus(false);
        }, 2000);
    }
    
    //-----------------Перемещает На страницу регистрации
    const routeToSignUp = () => {
        return navigate(routes.Registration.path);
    }

    return(
        <div className="login-window">
            <div className={`logo top-right ${ visible }`}></div>
            <div className={`logo top-left ${ visible }`}></div>
            <div className={`logo bottom-right ${ visible}`}></div>
            <div className={`logo bottom-left ${ visible }`}></div>
            <AngleLogo/>
            <div className="auth-window">
                <div className={`logo-above ${ visible }`}></div>
                <LoginHeader/>
                {Object.keys(inputs).map((key) => {
                    return (
                        <LoginInput
                            key={key}
                            type={`${key}`} 
                            inputLink={inputs}
                            // eslint-disable-next-line
                            style={style}
                        />
                    );
                })}
                <div className={`invalid-message ${messageStatus  ? 'invalid-show' : 'invalid-hide'}`}>*invalid login or password</div>
                <div className={`invalid-message ${emptyString  ? 'invalid-show' : 'invalid-hide'}`}>*please fill all the fields</div>
                <div className="button-box">
                    <LoginButton
                        onClick={() => signIn()}
                        className={"login-game-button"}
                        text={'Войти'}
                    />
                    <LoginButton
                        onClick={() => routeToSignUp()}
                        className={"sign-up-button"}
                        text={'Регистрация'}
                    />
                </div>
            </div>
        </div>
    );
}