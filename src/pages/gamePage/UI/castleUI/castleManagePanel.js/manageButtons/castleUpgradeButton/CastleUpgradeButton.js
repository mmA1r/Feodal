import React from "react";

import './castleUpgradeButton.scss';

export default function CastleUpgradeButton() {

    return (
        <svg className="upgrade-castle-beauty" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
            <rect className="upgrade-icon-frame-back" x="1" y="1" width="54" height="54" fill="#460000"/>
            <rect x="1" y="1" width="54" height="54" fill="url(#paint0_linear_1_2)"/>
            <path className="upgrade-icon-frame" d="M2 2H4V4H2V2Z"/>
            <path className="upgrade-icon-frame" d="M52 2H54V4H52V2Z"/>
            <path className="upgrade-icon-frame" d="M52 52H54V54H52V52Z"/>
            <path className="upgrade-icon-frame" d="M2 52H4V54H2V52Z"/>
            <path className="upgrade-arrow" d="M15.1019 21.5L28 6.7593L40.8981 21.5H33H32.5V22V49.5H23.5V22V21.5H23H15.1019Z" stroke="white"/>
            <rect className="upgrade-castle-mini" x="18" y="44" width="8" height="7" fill="white"/>
            <path className="upgrade-castle-mini" d="M17 41L18.25 41.75L19.5 41L22 42.5L24.5 41L25.75 41.75L27 41V44H17V41Z" fill="white"/>
            <path className="upgrade-castle-mini-door" d="M21 48C21 47.4477 21.4477 47 22 47V47C22.5523 47 23 47.4477 23 48V51H21V48Z" fill="#590010"/>
            <rect className="upgrade-icon-frame2" x="1" y="1" width="54" height="54" stroke="#FFC632" strokeWidth="2"/>
            <defs>
                <linearGradient id="paint0_linear_1_2" x1="19.5" y1="1.27192e-06" x2="55" y2="54.5" gradientUnits="userSpaceOnUse">
                    <stop offset="0.327597" stopColor="#510013" stopOpacity="0.56"/>
                    <stop offset="0.987654" stopColor="#930023"/>
                </linearGradient>
            </defs>
        </svg>
    );
}