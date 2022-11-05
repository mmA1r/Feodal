import React from "react";

import './castleInformPanel.scss';

export default class CastleInformPanel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="castle-inform-panel">
                <div className="castle-name"></div>
                <div className="castle-inform-panel-border">
                    <div className="castle-inform-panel-back"></div>
                </div>
            </div>
        );
    }
}