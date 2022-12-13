import { useEffect, useState } from "react";
import StoreLoader from "../../../store/StoreLoader";

import './moneyRent.scss'

export default function MoneyRent(props) {
    const { time } = props;
    const [timeToRent, setTimeToRent] = useState(time);
    const store = new StoreLoader()

    const minutes = Math.floor(timeToRent / 60);
    const seconds = Math.floor(timeToRent - minutes * 60);

    useEffect(() => {
        let timer;
        if(time > 0) {
            timer = setTimeout(() => {
                setTimeToRent(timeToRent - 1);
                store.loadToStore({ nextRentTime: timeToRent-1 }, 'gamer');
            }, 1000);
            if(timeToRent <= 0) {
                clearTimeout(timer);
            }
        }
        return () => {
            clearTimeout(timer);
        }
    });

    return(
        <div className="money-rent-box">
            ( {minutes} : {seconds < 10 ? '0' + seconds : seconds});
        </div>
    );
}