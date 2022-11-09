import React from "react";

import './castleMiniFrame.scss';

export default class CastleMiniFrame extends React.Component {
    // eslint-disable-next-line
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className={`castle-mini-frame castle-level-1`}/>
                <div className={'castle-mini-picture castle-level-1'}/>
            </div>
        );
    }
}