import { useSelector } from 'react-redux';
import './enemyCastleMini.scss';

export default function EnemyCastleMini() {

    const castleLevel = useSelector((state) => state.enemyCastle.castleLevel);

    return (
        <div className={`enemy-castle-mini`}>
            <div className={`enemy-castle-inform-mini-${castleLevel}`}/>
            <div className={`enemy-castle-mini-picture-${castleLevel}`}/>
        </div>
    );
}