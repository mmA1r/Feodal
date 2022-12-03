import { useSelector } from 'react-redux';
import './unitMiniFrame.scss';

export default function UnitMiniFrame() {

    const unitLevel = useSelector((state) => state.currentUnit.level);

    return (
        <div className={`unit-frame-panel${unitLevel}`}>
        </div>
    );
}