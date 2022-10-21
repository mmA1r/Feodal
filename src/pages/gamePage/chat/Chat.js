import React from "react";
import store from "../../../store/store";

import './chat.scss';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.server = store.getState().server.value;
        this.message = React.createRef();
    }
    
    render() {
        return(
            <div className="chat-box">
                <div className="message-block"></div>
                <input className="message-input"></input>
            </div>
        );
    }
}