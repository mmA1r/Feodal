import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

import Money from '../UI/castleUI/castleManagePanel.js/money/Money';
import './gamerMoney.scss'

export default function GamerMoney() {
    const server = useSelector((state) => state.server.value);

    useEffect(() => {

    });

    useLayoutEffect(() => {

    });
    // eslint-disable-next-line
    async function getMoney() {
        // eslint-disable-next-line
        const data =  await server.getCastle();
    }

    return(
        <div className="gamer-money">
            <div className="gamer-money-icon">
                <Money/>
                <span className="gamer-money-num">{0}</span>
            </div>
        </div>
    );
}