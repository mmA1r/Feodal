import React from "react";

export default function LoginButton(props) {

    const { onClick, className, text } = props;
    
    return(
        <button 
            className={className}
            onClick={onClick}
        >
            {text}
        </button>
    );
}