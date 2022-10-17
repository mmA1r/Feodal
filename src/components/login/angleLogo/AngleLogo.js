import React from "react";

import './angleLogo.scss';

export default class AngleLogo extends React.Component  {
    render() {
        return(
            <div>
                <div className="logo top-left"/>
                <div className="logo top-right"/>
                <div className="logo bottom-left"/>
                <div className="logo bottom-right"/>
            </div>
        );
    }
}