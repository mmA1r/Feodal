import { useSelector } from "react-redux";

import './gamerMight.scss'

export default function GamerMight() {
    const might = useSelector((state) => state.gamer.might);

    return(
        <div className="gamer-might-icon">
            <div className="might-icon"/>
            <span className="gamer-might-num">{might}</span>
        </div>
    );
}