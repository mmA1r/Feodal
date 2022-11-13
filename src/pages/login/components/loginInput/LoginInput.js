import React from "react";

import './loginInput.scss';

export default function LoginInput(props) {
        const { type, inputLink, style = '' } = props;

    return(
        <div className={type}>
            <input
                ref={inputLink[type]}
                className={`auth-input ${style}`}
                type={type === 'password' ? 'password' : 'text'} 
                id={type}
                placeholder={type}
                autoComplete="off"
                required
            />
            <label htmlFor={type} className="input-label">{type}</label>
        </div>
    );
}