import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";

import './moneyRent.scss'

export default function MoneyRent() {

    const store = useStore();

    const time = store.getState().gamer.nextRentTime;

    const [timeToRentCounter, setTimeToRentCounter] = useState(time);

    // useEffect(() => {
    //     setInterval(() => {
    //         setTimeToRentCounter(-1);
    //     }, 1000);
    // }, [])

    return(
        <div className="money-rent-box">
            ( {timeToRentCounter} )
        </div>
    );
}