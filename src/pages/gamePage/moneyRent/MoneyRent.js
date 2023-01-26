import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import './moneyRent.scss'

export default function MoneyRent() {
    const timeToRent = useSelector(state => state.gamer.nextRentTime);
    const [timeToRentState, setTimeToRentState] = useState(Math.floor((timeToRent - Date.now()) / 1000));
    const date = Date.now();

    useEffect(() => {
        const interval = setInterval(() => {
            if(date - Date.now() <= 0) {
                setTimeToRentState(Math.floor((timeToRent - Date.now()) / 1000));
                clearInterval(interval);
            }
        }, 1000);
    });

    const minutes = Math.floor(timeToRentState / 60) % 60;
    const seconds = Math.floor(timeToRentState % 60);

    return(
        <div className="money-rent-box">
            ({minutes} : {seconds < 10 ? '0' + seconds : seconds});
        </div>
    );
}