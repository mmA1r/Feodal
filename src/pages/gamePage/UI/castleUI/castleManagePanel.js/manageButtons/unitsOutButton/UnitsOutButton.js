import { useSelector } from 'react-redux';
import StoreLoader from '../../../../../../../store/StoreLoader';

import './unitsOutButton.scss';

export default function UnitsOutButton() {

    const unitsUI = useSelector((state) => state.unitsInterface.value);
    const storeLoader = new StoreLoader();

    function openUnitsInterface() {
        if(unitsUI) {
            return storeLoader.loadToStore(false, 'withdrawUnits');
        } else {
            return storeLoader.loadToStore(true, 'withdrawUnits');
        }
    }

    return (
        <button 
            className='units-out-button'
            onClick={() => openUnitsInterface()}
        >
            <svg className='units-go-out-button'  viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                <rect className="units-go-out-button-back" x="1" y="1" width="54" height="54" fill="#460000"/>
                <rect x="1" y="1" width="54" height="54" fill="url(#paint0_linear_1_2)"/>
                <rect className="upgrade-castle-mini" x="13.7" y="21.1" width="29.6" height="25.9" fill="white"/>
                <path className="upgrade-castle-mini-door"d="M24.8 33.2C24.8 32.6477 25.2477 32.2 25.8 32.2H31.2C31.7523 32.2 32.2 32.6477 32.2 33.2V47H24.8V33.2Z" fill="#590010"/>
                <path className="upgrade-castle-mini" d="M10 9L14.625 11.775L19.25 9L28.5 14.55L37.75 9L42.375 11.775L47 9V20.1H10V9Z" fill="white"/>
                <path className="upgrade-arrow" d="M39.6111 32.1699L47.2765 39.5L39.6111 46.8301V42.5357V42.0357H39.1111H28.5V36.9643H39.1111H39.6111V36.4643V32.1699Z" fill="#620013" stroke="white"/>
                <path className='upgrade-icon-frame' d="M2 2H4V4H2V2Z" fill="#FFC632"/>
                <path className='upgrade-icon-frame' d="M52 2H54V4H52V2Z" fill="#FFC632"/>
                <path className='upgrade-icon-frame' d="M52 52H54V54H52V52Z" fill="#FFC632"/>
                <path className='upgrade-icon-frame' d="M2 52H4V54H2V52Z" fill="#FFC632"/>
                <rect className='upgrade-icon-frame2' x="1" y="1" width="54" height="54" stroke="#FFC632" strokeWidth="2"/>
                <defs>
                    <linearGradient id="paint0_linear_1_2" x1="19.5" y1="1.27192e-06" x2="55" y2="54.5" gradientUnits="userSpaceOnUse">
                        <stop offset="0.327597" stopColor="#510013" stopOpacity="0.56"/>
                        <stop offset="0.987654" stopColor="#930023"/>
                    </linearGradient>
                </defs>
            </svg>
        </button>        
    );
}