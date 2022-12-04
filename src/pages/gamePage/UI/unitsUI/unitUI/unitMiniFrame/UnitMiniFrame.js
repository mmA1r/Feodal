import { useSelector } from 'react-redux';
import './unitMiniFrame.scss';

export default function UnitMiniFrame() {

    const unitType = useSelector((state) => state.currentUnit.type);
    const unitLevel = useSelector((state) => state.currentUnit.level);

    return (
        <div className={`unit-frame-panel${unitLevel}-${unitType}`}>
        </div>
    );
}