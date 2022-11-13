import React from "react";

import './loginHeader.scss';

export default function LoginHeader() {
    return(
        <div className="login-header">
            <div className='login-logo'></div>
            <div className="login-title">
                <div className="title-through"></div>    
                FEODAL
            </div>
        </div>
    );
}