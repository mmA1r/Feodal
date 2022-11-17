import { useSelector } from 'react-redux';
import './castleMiniFrame.scss';

export default function CastleMiniFrame() {

    const level = useSelector((state) => state.userLevel.value);

    return (
        <div>
            <div className={`castle-mini-frame castle-level-${level}`}/>
            <div className={`castle-mini-picture castle-level-${level}`}/>
        </div>
    );
}