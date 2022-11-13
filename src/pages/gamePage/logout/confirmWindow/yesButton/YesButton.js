import React from "react";

export default function YesButton() {

    return(
        <svg className="beauty-confirm-button" viewBox="0 0 77 27" xmlns="http://www.w3.org/2000/svg">
            {/* frame */}
            <rect className="beauty-confirm-button-background" x="2" y="2"/>
            <rect className="beauty-confirm-button-border" x="3" y="3"/>
            {/* confirm-icon */}
            <circle className="confirm-icon shield" cx="38.5" cy="13.5" r="7.5"/>
            {/* angle-frame */}
                {/* top-right */}
                <path className="angle-frame-back" d="M70 1H76V7L74 8L70 7L69 3L70 1Z"/>
                <path className="angle-frame-jewel-back" d="M72 3L76 1L74 5L70 7L72 3Z"/>
                <path className="angle-frame-jewel" d="M71.7289 5.27113L72.6822 3.68222L74.2711 2.72887L73.3178 4.31778L71.7289 5.27113Z"/>
                <path className="angle-frame-border" d="M69.5 2L70.5 6.5L75 7.5L74 8L70 7L69 3L69.5 2Z"/>
                {/* top-left */}
                <path className="angle-frame-back" d="M7 1H1V7L3 8L7 7L8 3L7 1Z"/>
                <path className="angle-frame-jewel-back" d="M5 3L1 1L3 5L7 7L5 3Z"/>
                <path className="angle-frame-jewel" d="M5.27113 5.27113L4.31778 3.68222L2.72887 2.72887L3.68222 4.31778L5.27113 5.27113Z"/>
                <path d="M7.5 2L6.5 6.5L2 7.5L3 8L7 7L8 3L7.5 2Z"/>
                {/* bottom-left */}
                <path className="angle-frame-back" d="M7 26H1V20L3 19L7 20L8 24L7 26Z"/>
                <path className="angle-frame-jewel-back" d="M5 24L1 26L3 22L7 20L5 24Z"/>
                <path className="angle-frame-jewel" d="M5.27113 21.7289L4.31778 23.3178L2.72887 24.2711L3.68222 22.6822L5.27113 21.7289Z"/>
                <path className="angle-frame-border" d="M7.5 25L6.5 20.5L2 19.5L3 19L7 20L8 24L7.5 25Z"/>
                {/* bottom-right */}
                <path className="angle-frame-back" d="M70 26H76V20L74 19L70 20L69 24L70 26Z"/>
                <path className="angle-frame-jewel-back" d="M72 24L76 26L74 22L70 20L72 24Z"/>
                <path className="angle-frame-jewel" d="M71.7289 21.7289L72.6822 23.3178L74.2711 24.2711L73.3178 22.6822L71.7289 21.7289Z"/>
                <path className="angle-frame-border" d="M69.5 25L70.5 20.5L75 19.5L74 19L70 20L69 24L69.5 25Z" />
            {/* shield */}
            <circle className="active-confirm-icon-elem shield" cx="38.5" cy="13.5" r="2"/>
            <rect className="active-confirm-icon-elem shield" x="34" y="9" width="0.5" height="9"/>
            <path className="active-confirm-icon-elem shield" d="M42.5 9H43V18H42.5V9Z"/>
            <rect className="active-confirm-icon-elem shield" x="36" y="8" width="0.5" height="3"/>
            <path className="active-confirm-icon-elem shield" d="M40.5 8H41V11H40.5V8Z"/>
            <path className="active-confirm-icon-elem shield" d="M38.25 7H38.75V10H38.25V7Z"/>
            <path className="active-confirm-icon-elem shield" d="M38.25 17H38.75V20H38.25V17Z"/>
            <rect className="active-confirm-icon-elem shield" x="36" y="16" width="0.5" height="3"/>
            <path className="active-confirm-icon-elem shield" d="M40.5 16H41V19H40.5V16Z"/>
            <rect className="active-confirm-icon-elem shield" width="0.5" height="5" transform="matrix(-1 0 0 1 33 11)"/>
            <rect className="active-confirm-icon-elem shield" width="0.5" height="5" transform="matrix(-1 0 0 1 44.5 11)"/>

            {/* gradient */}
            <defs>
            <linearGradient id="background-button-gradient" x1="25.5" y1="0" x2="25.5" y2="51" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f83c68#4f0568"/>
                <stop offset="1" stopColor="#f83c68"/>
            </linearGradient>
            </defs>
        </svg>
    );
}