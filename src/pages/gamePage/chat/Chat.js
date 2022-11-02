import React from "react";

import store from "../../../store/store";

import AvailUsers from "./availUsers/AvailUsers";
import SendMessageButton from "./sendMessage/sendMessageButton/SendMessageButton";
import SendMessageInputLeft from "./sendMessage/sendMessageInput/SendMessageInputLeft";
import SendMessageInputRight from "./sendMessage/sendMessageInput/SendMessageInputRight";
import SendMessageInputTop from "./sendMessage/sendMessageInput/SendMessageInputTop";
import SendMessageInputDown from "./sendMessage/sendMessageInput/SendMessageInputDown";


import './chat.scss';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.server = store.getState().server.value;

        this.message = React.createRef();
        this.chat = React.createRef();

        this.loggedUsers = null;

        this.state = {
            showUsers: false,
            showInputFailure: false,
            messages: [],
            isOpenChat: false
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.getMessages();
        }, 500);
    }

    async sendMessageTo(message, messageTo) {
        return await this.server.sendMessageTo(message, messageTo);
    }

    async sendMessageAll(message) {
        return await this.server.sendMessageAll(message);
    }
    
    async getMessages() {
        const message = await this.server.getMessages();
        if(this.state.messages.length !== message.length) {
            return this.setState({ messages: message.reverse() });
        }
    }

    async getLoggedUsers() {
        return this.loggedUsers = await this.server.getLoggedUsers();
    }

    onFocus() {
        this.setState({ isOpenChat: true })
        return this.getLoggedUsers();
    }

    //----------Послать сообщение
    sendMessage(e) {
        e.preventDefault()
        const text = this.message.current.value;
        this.message.current.value = '';
        if(text) {
            const arrOfSymbols = text.split('');
            if (
                arrOfSymbols[0] === '@' && 
                arrOfSymbols.includes('#')
            ) {
                return this.sendMessageById(text);
            } else if (
                arrOfSymbols[0] === '@' && 
                !arrOfSymbols.includes('#')
            ) {
                return this.sendMessageWithoutId(text);
            } else if(arrOfSymbols[0] !== '@') {
                this.sendMessageAll(text);
            }
        }
    }

    sendMessageById(message) {
        const splttedText = message.split('#').slice(1).join(' ').split(' ');
        const userId = splttedText[0];
        const userMessage = splttedText.slice(1).join(' ');
        return this.sendMessageTo(userMessage, userId);
    }

    sendMessageWithoutId(message) {
        const splttedText = message.split('@').slice(1).join(' ').split(' ');
        const userName = splttedText[0];
        const userMessage = splttedText.slice(1).join(' ');
        const userArr = [];
        this.loggedUsers.forEach(user => {
            if(user.name === userName) {
                return userArr.push(user);
            }
        });
        if(userArr.length > 1) {
            const length = userArr[0].name.split('').length;
            this.message.current.value = `@${userArr[0].name}#  ${userMessage}`;
            this.setState({ showInputFailure: true });
            setTimeout(() => {
                return this.setState({ showInputFailure: false });
            }, 300);
            return this.message.current.selectionStart = this.message.current.selectionEnd = length + 2;
        } else {
            this.sendMessageTo(userMessage, userArr[0].id);
        }
    }

    //--------Показывает залогининых юзеров
    showAvailableUsers(e) {
        const text = this.message.current.value;
        if(text) {
            const message = text.split();
            if(message[0].includes('@') && message[0].split('@')[1] === '') {
                return this.setState({ showUsers: true });
            } else {
                return this.setState({ showUsers: false });
            }
        }
    }

    // Закрывает окошко залогиненых юзеров
    closeList(e) {
        if(e.keyCode === 8) {
            return this.setState({ showUsers: false });
        }
    }
    
    // Кладет выбранного юзера в инпут
    getUserToInput(name, id) {
        this.setState({ showUsers: false });
        this.userAddresseeId = id;
        this.message.current.value = '';
        this.message.current.focus();
        return this.message.current.value = '@' + name + '#' + id + ' ';
    }

    blur() {
        let chatBlock = document.querySelector('.chat-box');
        document.addEventListener('click', (e) => {
            if(!chatBlock.contains(e.target)) {
                return this.setState({ isOpenChat: false });
            }
        });
    }

    render() {
        return(
            <div className={`chat-box`} onClick={() => this.blur()}>
                <div className={`message-block ${ this.state.isOpenChat ? 'showChat' : 'hideChat' }`}>
                    {/* ------------------------------Уф.....Ну тут кароче чота происходит....... Вам не обязательно знать......---------------------------- */}
                    { 
                        this.state.showUsers ? 
                            <AvailUsers 
                                users={this.loggedUsers}
                                placeUser={(name, id) => this.getUserToInput(name, id)}
                            />
                        : ''
                    }
                    {
                        this.state.messages.map(message => {
                            return message.messageTo !== null ? 
                                <div
                                    className="personal-message-line" 
                                    key={message.message}
                                >
                                    <span className="message-sender">{message.name}: </span>
                                    <span className="message">{message.message}</span>    
                                </div>
                            : <div
                                className="message-line" 
                                key={message.message}
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
                        className={`message-input ${this.state.showInputFailure ? 'show-input-failure' : ''}`}
                        type={'text'} 
                        ref={this.message}
                        onFocus={() => this.onFocus()}
                        onInput={(e) => this.showAvailableUsers(e)}
                        onKeyDown={(e) => this.closeList(e)}
                    />
                    <button 
                        className="send-message-button"
                        type={'submit'}
                        onClick={(e) => this.sendMessage(e)}
                    >
                        <SendMessageButton/>
                    </button>
                </form>
            </div>
        );
    }
}