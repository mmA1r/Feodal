import { useSelector } from "react-redux";
import GamerMight from "../gamerMight/GamerMight";
import MoneyRent from "../moneyRent/MoneyRent";

import Money from '../UI/castleUI/castleManagePanel.js/money/Money';
import './gamerMoney.scss'

export default function GamerMoney() {
    const money = useSelector((state) => state.gamer.money);
    const rentTiem = useSelector((state) => state.gamer.nextRentTime);

    return(
        <div className="gamer-money">
            <div className="gamer-money-icon">
                <Money/>
                <span className="gamer-money-num">{money}</span>
            </div>
            <MoneyRent key={rentTiem} time={rentTiem}/>
            <GamerMight/>
        </div>
    );
}