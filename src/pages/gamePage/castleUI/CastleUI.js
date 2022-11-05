import React from "react";
import CastleInformPanel from "./castleInformPanel/CastleInformPanel";
import CastleManagePanel from "./castleManagePanel.js/CastleManagePanel";
import CastleMiniFrame from "./castleMiniFrame/CastleMiniFrame";

import './castleUI.scss';

export default class CastleUI extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="castle-UI">
                <CastleMiniFrame/>
                <CastleInformPanel/>
                <CastleManagePanel/>
            </div>
        );
    }
}