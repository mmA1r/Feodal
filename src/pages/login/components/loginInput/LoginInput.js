import React from "react";

import './loginInput.scss';

export default class LoginInput extends React.Component  {
    constructor(props) {
        super(props);
        const { type, inputLink, style } = props;
        this.type = type;
        this.inputLink = inputLink;
        this.style = style || '';
    }

    render() {
        return(
            <div className={this.type}>
                <input
                    ref={this.inputLink[this.type]}
                    className={`auth-input ${this.style}`}
                    type={this.type === 'password' ? 'password' : 'text'} 
                    id={this.type}
                    placeholder={this.type}
                    autoComplete="off"
                    required
                />
                <label htmlFor={this.type} className="input-label">{this.type}</label>
            </div>
        );
    }
}