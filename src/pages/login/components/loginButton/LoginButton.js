import React from "react";

export default class LoginButton extends React.Component  {
    constructor(props) {
        super(props);
        const { onClick, className, text } = props;
        this.onClick = onClick;
        this.className = className;
        this.text = text;
    }

    render() {
        return(
            <button 
                className={this.className}
                onClick={this.onClick}
            >
                {this.text}
            </button>
        );
    }
}