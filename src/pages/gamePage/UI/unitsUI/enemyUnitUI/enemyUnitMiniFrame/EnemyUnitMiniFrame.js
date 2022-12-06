import { useSelector } from 'react-redux';
import './enemyUnitMiniFrame.scss';

export default function EnemyUnitMiniFrame() {

    const unitType = useSelector((state) => state.currentUnit.type);
    const unitLevel = useSelector((state) => state.currentUnit.level);

    return (
        <div className={`enemy-unit-frame-panel${unitLevel}-${unitType}`}>
        </div>
    );
}