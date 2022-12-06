import { useSelector } from 'react-redux';
import './villageInformPanel.scss';

export default function VillageInformPanel() {

    const currentHp = useSelector((state) => state.village.currentHp);
    const fullHp = useSelector((state) => state.village.fullHp);
    const population = useSelector((state) => state.village.population);
    return (
        <div className="village-inform-panel">
            {/* <div className="village-name"></div> */}
            <span className='village-population'>{population}</span>
            <progress className='village-hp-bar' value={currentHp} max={fullHp}/>
        </div>
    );
}