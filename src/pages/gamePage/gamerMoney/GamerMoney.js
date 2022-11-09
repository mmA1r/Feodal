import React from "react";

import Money from '../castleUI/castleManagePanel.js/money/Money';
import store from "../../../store/store";
import './gamerMoney.scss'

export default class GamerMoney extends React.Component {
    constructor(props) {
        super(props);
        this.server = store.getState().server.value;

        this.state = {
            money: 0
        }
        this.interval = '';
    }

    componentDidMount() {
        // this.interval = setInterval(() => {
        //     this.getMoney();
        // }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async getMoney() {
        const data =  await this.server.getCastle();
        return this.setState({ money: data.castle.money });
    }

    render() {
        return(
            <div className="gamer-money">
                <div className="gamer-money-icon">
                    <Money/>
                    <span className="gamer-money-num">{this.state.money}</span>
                </div>
            </div>
        );
    }
}