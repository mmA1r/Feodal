import React from "react";

import './castleMiniFrame.scss';

export default class CastleMiniFrame extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={`castle-mini-frame castle-level-1`}>
                <div className={'castle-mini-picture castle-level-1'}></div>
            </div>
        );
    }
}