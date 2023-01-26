import { useSelector } from "react-redux";
import StoreLoader from "../../../store/StoreLoader";
import GamerMight from "../gamerMight/GamerMight";
import MoneyRent from "../moneyRent/MoneyRent";

import Money from '../UI/castleUI/castleManagePanel.js/money/Money';
import './gamerMoney.scss'

export default function GamerMoney() {
    const money = useSelector((state) => state.gamer.money);

    const store = new StoreLoader();

    function showHint(e) {
        return store.loadToStore({
            state: true,
            type: 'money',
            top: e.pageY, 
            left: e.pageX
        }, 'hint');
    }

    function hideHint() {
        return store.loadToStore({
            state: false,
            type: null,
            top: 2000, 
            left: 0
        }, 'hint');
    }

    return(
        <div className="gamer-money">
            <div
                className="gamer-money-icon"
                onMouseEnter={(e) => showHint(e)}
                onMouseLeave={() => hideHint()}
            >
                <Money/>
                <span className="gamer-money-num">{money}</span>
            </div>
            <MoneyRent/>
            <GamerMight/>
        </div>
    );
}