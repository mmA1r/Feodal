import { useSelector } from 'react-redux';

import AttackVillageButton from './buttons/attackVillageButton/AttackVillageButton';
import RobVillageButton from './buttons/robVillageButton/RobVillageButton';

import './villageInformPanel.scss';

export default function VillageInformPanel() {

    const currentHp = useSelector((state) => state.village.currentHp);
    const fullHp = useSelector((state) => state.village.fullHp);
    const population = useSelector((state) => state.village.population);
    const might = useSelector((state) => state.gamer.might);

    const server = useSelector((state) => state.server.value);

    function robVillage() {
        
    }

    function attackVillage() {

    }
    
    return (
        <div className="village-inform-panel">
            { might >= population ? 
                <div>
                    <button
                        className='rob-village-button'
                        onClick={() => robVillage()}
                    >
                        <RobVillageButton/>
                    </button>
                    <button
                        className='attack-village-button'
                        onClick={() => attackVillage()}
                    >
                        <AttackVillageButton/>
                    </button>
                </div> : ''
            }
            <span className='village-population'>{population}</span>
            <progress className='village-hp-bar' value={currentHp} max={fullHp}/>
        </div>
    );
}