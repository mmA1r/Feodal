import { useSelector } from 'react-redux';
import './enemyCastleMini.scss';

export default function EnemyCastleMini() {

    const castleLevel = useSelector((state) => state.enemyCastle.castleLevel);

    return (
        <div className={`enemy-castle-mini`}>
            <div className={`enemy-castle-inform-mini-${castleLevel ? castleLevel : 1}`}/>
            <div className={`enemy-castle-mini-picture-${castleLevel ? castleLevel : 1}`}/>
        </div>
    );
}