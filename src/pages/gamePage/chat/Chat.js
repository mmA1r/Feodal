import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import AvailUsers from "./availUsers/AvailUsers";
import SendMessageButton from "./sendMessage/sendMessageButton/SendMessageButton";
import SendMessageInputLeft from "./sendMessage/sendMessageInput/SendMessageInputLeft";
import SendMessageInputRight from "./sendMessage/sendMessageInput/SendMessageInputRight";
import SendMessageInputTop from "./sendMessage/sendMessageInput/SendMessageInputTop";
import SendMessageInputDown from "./sendMessage/sendMessageInput/SendMessageInputDown";


import './chat.scss';

export default function Chat() {

    const server = useSelector((state) => state.server.value);
    const message = useRef();

    const [messages, setMessages] = useState([]);
    const [chatState, setChatState] = useState(false);
    const [activeUsers, setActiveUsers] = useState(false);
    const [inputFailure, setInputFailure] = useState(false);
    const [loggedUsers, setLoggedUsers] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            getMessages();
        }, 1000);


        return () => {
            return clearInterval(interval);
        }
         // eslint-disable-next-line
    }, []);

    async function sendMessageTo(message, messageTo) {
        return await server.sendMessageTo(message, messageTo);
    }

    async function sendMessageAll(message) {
        return await server.sendMessageAll(message);
    }
    
    async function getMessages() {
        const message = await server.getMessages();
        if(message) {
            if(messages.length !== message.length) {
                return setMessages(message.reverse());
            }
        }
    }

    async function getLoggedUsers() {
        return setLoggedUsers(await server.getLoggedUsers());
    }

    function onFocus() {
        setChatState(true);
        return getLoggedUsers();
    }

    //----------Послать сообщение
    function sendMessage(e) {
        e.preventDefault()
        const text = message.current.value;
        message.current.value = '';
        if(text) {
            const arrOfSymbols = text.split('');
            if (
                arrOfSymbols[0] === '@' && 
                arrOfSymbols.includes('#')
            ) {
                return sendMessageById(text);
            } else if (
                arrOfSymbols[0] === '@' && 
                !arrOfSymbols.includes('#')
            ) {
                return sendMessageWithoutId(text);
            } else if(arrOfSymbols[0] !== '@') {
                sendMessageAll(text);
            }
        }
    }

    function sendMessageById(message) {
        const splttedText = message.split('#').slice(1).join(' ').split(' ');
        const userId = splttedText[0];
        const userMessage = splttedText.slice(1).join(' ');
        return sendMessageTo(userMessage, userId);
    }

    function sendMessageWithoutId(messageValue) {
        const splttedText = messageValue.split('@').slice(1).join(' ').split(' ');
        const userName = splttedText[0];
        const userMessage = splttedText.slice(1).join(' ');
        const userArr = [];
        loggedUsers.forEach(user => {
            if(user.name === userName) {
                return userArr.push(user);
            }
        });
        if(userArr.length > 1) {
            const length = userArr[0].name.split('').length;
            message.current.value = `@${userArr[0].name}#  ${userMessage}`;
            setInputFailure(true);
            setTimeout(() => {
                return setInputFailure(false);
            }, 300);
            return message.current.selectionStart = message.current.selectionEnd = length + 2;
        } else {
            sendMessageTo(userMessage, userArr[0].id);
        }
    }

    //--------Показывает залогининых юзеров
    function showAvailableUsers() {
        const text = message.current.value;
        if(text) {
            const message = text.split();
            if(message[0].includes('@') && message[0].split('@')[1] === '') {
                return setActiveUsers(true);
            } else {
                return setActiveUsers(false);
            }
        }
    }

    // Закрывает окошко залогиненых юзеров
    function closeList(e) {
        if(e.keyCode === 8) {
            return setActiveUsers(false);
        }
    }
    
    // Кладет выбранного юзера в инпут
    function getUserToInput(name, id) {
        setActiveUsers(false);
        message.current.value = '';
        const timeout = setTimeout(() => {
            message.current.focus();
            message.current.selectionStart = message.current.selectionEnd = message.current.value.length;
            return clearTimeout(timeout);
        }, 50);
        return message.current.value = '@' + name + '#' + id + ' ';
    }

    function blurChat() {
        let chatBlock = document.querySelector('.chat-box');
        document.addEventListener('click', (e) => {
            if(chatBlock) {
                if(!chatBlock.contains(e.target)) {
                    message.current?.blur();
                    return setChatState(false);
                }
            }
        });
    }

    return(
        <div className={`chat-box ${ chatState ? 'show-chat-box' : 'hide-chat-box' }`} onClick={() => blurChat()}>
            <div className={`message-block ${ chatState ? 'showChat' : 'hideChat' }`}>
                {/* ------------------------------Уф.....Ну тут кароче чота происходит....... Вам не обязательно знать......---------------------------- */}
                { 
                    activeUsers ? 
                        <AvailUsers 
                            users={loggedUsers}
                            placeUser={(name, id) => getUserToInput(name, id)}
                        />
                    : ''
                }
                {
                    messages.map(message => {
                        return message.messageTo !== null ? 
                            <div
                                className="personal-message-line" 
                                key={message.id}
                            >
                                <span className="message-sender">{message.name}: </span>
                                <span className="message">{message.message}</span>    
                            </div>
                        : <div
                            className="message-line" 
                            key={message.id}
                        >
                            <span className="message-sender">{message.name}: </span>
                            <span className="message">{message.message}</span>    
                        </div>
                    })
                }
            </div>
            <form className="send-message-block">
                <SendMessageInputLeft/>
                <SendMessageInputRight/>
                <SendMessageInputDown/>
                <SendMessageInputTop/>
                <input 
                    className={`message-input ${inputFailure ? 'show-input-failure' : ''}`}
                    type={'text'} 
                    ref={message}
                    onFocus={() => onFocus()}
                    onInput={(e) => showAvailableUsers(e)}
                    onKeyDown={(e) => closeList(e)}
                />
                <button 
                    className="send-message-button"
                    type={'submit'}
                    onClick={(e) => sendMessage(e)}
                >
                    <SendMessageButton/>
                </button>
            </form>
        </div>
    );
}