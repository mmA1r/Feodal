import { useSelector } from 'react-redux';
import './villageMiniFrame.scss';

export default function VillageMiniFrame() {

    const villageLevel = useSelector((state) => state.village.villageLevel);

    return (
        <div className='village-mini'>
            <div className={`village-mini-frame-${villageLevel}`}/>
            <div className={`village-mini-picture-${villageLevel}`}/>
        </div>
    );
}