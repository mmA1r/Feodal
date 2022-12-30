import { useSelector } from 'react-redux';
import StoreLoader from '../../../../../store/StoreLoader';

import AttackVillageButton from './buttons/attackVillageButton/AttackVillageButton';
import RobVillageButton from './buttons/robVillageButton/RobVillageButton';

import './villageInformPanel.scss';

export default function VillageInformPanel() {

    const currentHp = useSelector((state) => state.village.currentHp);
    const fullHp = useSelector((state) => state.village.fullHp);
    const population = useSelector((state) => state.village.population);
    const villageId = useSelector((state) => state.village.id);
    const might = useSelector((state) => state.gamer.might);
    const canBeRobbed = useSelector((state) => state.village.canBeRobbed);
    const store = new StoreLoader()

    const server = useSelector((state) => state.server.value);

    async function robVillage() {
        const money = (await server.robVillage(villageId)).money-0;
        store.loadToStore({ money: money }, 'gamer');
    }

    function attackVillage() {
        return store.loadToStore({ attacked: true }, 'village');
    }
    
    return (
        <div className="village-inform-panel">
            { might >= population && canBeRobbed ? 
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