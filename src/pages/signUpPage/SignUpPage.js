import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginButton from "../components/loginButton/LoginButton";
import AngleLogo from "../components/angleLogo/AngleLogo";
import LoginHeader from '../components/loginHeader/LoginHeader';
import LoginInput from "../components/loginInput/LoginInput";

import './signUpPage.scss';

export default function SignUpPage() {

        const [visible, setVisible] = useState();
        const [dataStatus, setDataStatus] = useState();
        const [loginStatus, setLoginStatus] = useState();
        const [emptyString, setemptyString] = useState();
        const [succsessfulAuth, setSuccsessfulAuth] = useState(false);

        const navigate = useNavigate();
        const routes = useSelector((state) => state.routes.value);
        const server = useSelector((state) => state.server.value);

        const login = useRef();
        const password = useRef();
        const name = useRef();

        const inputs = {
            name: name,
            login: login,
            password: password,
        }
        const style = 'registration-style';
    //-----------------Отпраляет запрос серваку(регистрация) и в случае если ответ прилетел
    //-----------------Перенаправляет пользователя на страницу логина
    async function signUp() {
        const nameValue = name.current.value
        const loginValue = login.current.value;
        const passwordValue = password.current.value;
        if(nameValue && loginValue && passwordValue) {
            if(nameValue.indexOf(' ') === -1 && loginValue.indexOf(' ') === -1 && passwordValue.indexOf(' ') === -1) {
                const data = await server.registration(nameValue, loginValue, passwordValue);
                if(data) {
                    setSuccsessfulAuth(true);
                    setVisible('effect-shows');
                    setTimeout(() => {
                        setSuccsessfulAuth(false);
                        return routeToSignIn();
                    }, 1500);
                } else {
                    return showInvalidLogin();
                }   
            } else {
                return showInvalidData();
            }
        } else {
            setemptyString(true);
            const returnEmptyString = setTimeout(() => {
                setemptyString(false);
                clearTimeout(returnEmptyString);
            }, 2000);
        }
    }

    const showInvalidData = () => {
        login.current.value = '';
        password.current.value = '';
        name.current.value = '';
        setDataStatus(true);
        const returnDataStatus = setTimeout(() => {
            setDataStatus(false);
            clearTimeout(returnDataStatus);
        }, 2500);
    }

    const showInvalidLogin = () => {
        login.current.value = '';
        setLoginStatus(true);
        const returnLoginStatus = setTimeout(() => {
            setLoginStatus(false);
            clearTimeout(returnLoginStatus);
        }, 2500);
    }

    //-----------------Перемещает На страницу логина
    const routeToSignIn = () => {
        return navigate(routes.Login.path);
    }

    return(
        <div className="registration-window">
            <div className={`logo top-right ${ visible }`}></div>
            <div className={`logo top-left ${ visible }`}></div>
            <div className={`logo bottom-right ${ visible }`}></div>
            <div className={`logo bottom-left ${ visible }`}></div>
            <AngleLogo/>
            <div className="newcomer-window">
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
                <div className={`invalid-message ${succsessfulAuth  ? 'succ-show' : 'succ-hide'}`}>Регистрация успешна!</div>
                <div className={`invalid-message ${loginStatus ? 'invalid-show' : 'invalid-hide'}`}>Такой логин уже используется</div>
                <div className={`invalid-message ${dataStatus ? 'invalid-show' : 'invalid-hide'}`}>Неправльное имя пользователя или логин</div>
                <div className={`invalid-message ${emptyString ? 'invalid-show' : 'invalid-hide'}`}>Пожалуйста заполните все поля</div>
                <div className="button-box">
                    <LoginButton
                        onClick={() => signUp()}
                        className={"registration-button"}
                        text={'Зарегистрироваться'}
                    />
                    <LoginButton
                        onClick={() => routeToSignIn()}
                        className={"sign-in-button"}
                        text={'Уже зарегистрированны? Войти.'}
                    />
                </div>
            </div>
        </div>
    );
}