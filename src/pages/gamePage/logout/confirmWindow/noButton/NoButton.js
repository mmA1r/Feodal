import React from "react";

export default function NoButton() {

    return(
        <svg className="beauty-confirm-button" viewBox="0 0 77 27" xmlns="http://www.w3.org/2000/svg">
            {/* frame */}
            <rect className="beauty-confirm-button-background" x="2" y="2"/>
            <rect className="beauty-confirm-button-border" x="3" y="3"/>
            {/* confirm-icon */}
            <rect className="confirm-icon cross" x="33" y="8.70711" transform="rotate(-45 33 8.70711)"/>
            <rect className="confirm-icon cross" x="43.6066" y="8" transform="rotate(45 43.6066 8)"/>
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
                <path className="angle-frame-jewel" d="M71.7289 21.7289L72.6822 23.3178L74.2711 24.2711L73.3178 22.6822L71.7289 21.7289Z" />
                <path className="angle-frame-border" d="M69.5 25L70.5 20.5L75 19.5L74 19L70 20L69 24L69.5 25Z"/>
            {/* swords */}
            <path className="active-confirm-icon-elem handler" d="M44.2857 15L42.1428 17.1429L40 19.2857L40.7143 20L42.1428 17.8572L43.5714 19.2857H44.2857V18.5715L42.8571 17.1429L45 15.7143L44.2857 15Z"/>
            <path className="active-confirm-icon-elem blade" d="M33.1521 8.08568L34.7622 8.70157L42.9602 16.8995L41.8995 17.9602L33.706 9.7666L33.1521 8.08568Z"/>
            <path className="active-confirm-icon-elem handler" d="M37 19.2857L34.8571 17.1428L32.7143 15L32 15.7143L34.1429 17.1428L32.7143 18.5714V19.2857H33.4286L34.8571 17.8571L36.2857 20L37 19.2857Z"/>
            <path className="active-confirm-icon-elem blade" d="M44.0789 7.9918L44.0501 9.01061L40.3213 12.7394L39.2606 11.6788L42.9831 7.95624L44.0789 7.9918Z"/>
            <path className="active-confirm-icon-elem blade" d="M37.3241 15.1759L37.6495 15.5013L35.3454 17.8621L34.2793 16.796L36.5088 14.3607L36.8241 14.6759L37.3241 15.1759Z"/>
        </svg>
    );
}