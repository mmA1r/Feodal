import { useSelector } from "react-redux";
import StoreLoader from "../../../store/StoreLoader";

import './gamerMight.scss'

export default function GamerMight() {
    const might = useSelector((state) => state.gamer.might);

    const store = new StoreLoader();

    function showHint(e) {
        return store.loadToStore({
            state: true,
            type: 'might',
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
        <div 
            className="gamer-might-icon"
            onMouseEnter={(e) => showHint(e)}
            onMouseLeave={() => hideHint()}
        >
            <div className="might-icon"/>
            <span className="gamer-might-num">{might}</span>
        </div>
    );
}