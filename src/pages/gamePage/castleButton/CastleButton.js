import React from "react";

import './castleButton.scss';

export default function CastleButton() {
    return (
        <svg className="beauty-castle-manage-button" viewBox="0 0 51 51" xmlns="http://www.w3.org/2000/svg">
            <circle className="castle-manage-button-back" cx="25.5" cy="25.5" r="24" stroke="#C17400" strokeWidth="3"/>
            <path className="castle-manage-button-below" d="M8 38H43V39L41.2051 40L39.4103 39L32.2308 40H18.7692L11.5897 39L9.79487 40L8 39V38Z"/>
            {/* castle */}
            <path className="beauty-castle-manage-button-castle" d="M27 15.5858H36V17.0687L38 17.4394V23H25V17.4394L27 17.0687V15.5858Z"/>
            <path className="beauty-castle-manage-button-castle" d="M31.5 5.00002L39 14.4737H24L31.5 5.00002Z"/>
            <path className="beauty-castle-manage-button-castle" d="M41 22H39V24H36V22H34V24H31V22H29V24H26V22H24V24H22V38H41V22Z"/>
            <path className="beauty-castle-manage-button-castle" d="M9 22H11V24H14V22H16V24H19V22H21V24H24V22H26V24H28V38H9V22Z"/>
            <path className="beauty-castle-manage-button-castle" d="M17 16H18V23H17V16Z"/>
            <path className="beauty-castle-manage-button-castle" d="M19 16H23V19H19V16Z"/>
            <path className="beauty-castle-manage-button-door" d="M22.5 32.5V37.5H14.5V32.5C14.5 30.2909 16.2909 28.5 18.5 28.5C20.7091 28.5 22.5 30.2909 22.5 32.5Z"/>
            {/* window */}
            <path className="castle-manage-button-window" d="M30 18.5C30 17.6716 30.6716 17 31.5 17C32.3284 17 33 17.6716 33 18.5V22H30V18.5Z"/>
            {/* door-brick */}
            <path className="castle-manage-button-door-brick" d="M18 28H19V38H18V28Z"/>
            {/* bricks */}
            <path className="castle-manage-button-bricks" d="M36 35H38V36H36V35Z"/>
            <path className="castle-manage-button-bricks" d="M10 30H12V31H10V30Z"/>
            <path className="castle-manage-button-bricks" d="M27 31H30V32H27V31Z"/>
            <path className="castle-manage-button-bricks" d="M23 26H26V27H23V26Z"/>
            <path className="castle-manage-button-bricks" d="M33 12H36V13H33V12Z"/>
            <path className="castle-manage-button-bricks" d="M29 10H31V11H29V10Z"/>
            {/* diamonds */}
            <path className="castle-manage-button-jewel" d="M23.275 42.6409L23.25 42.6926V42.75V45.5V45.5574L23.275 45.6091L25.275 49.7341L25.5 50.198L25.725 49.7341L27.725 45.6091L27.75 45.5574V45.5V42.75V42.6926L27.725 42.6409L25.725 38.5159L25.5 38.052L25.275 38.5159L23.275 42.6409ZM34.8842 44.3217L34.9028 44.3777L34.9445 44.4194L36.3588 45.8336L36.4005 45.8754L36.4565 45.894L39.6385 46.9547L40.1128 47.1128L39.9547 46.6385L38.894 43.4565L38.8754 43.4005L38.8336 43.3588L37.4194 41.9445L37.3777 41.9028L37.3217 41.8842L34.1397 40.8235L33.6654 40.6654L33.8235 41.1397L34.8842 44.3217ZM13.4565 41.8841L13.4005 41.9028L13.3588 41.9445L11.9445 43.3588L11.9028 43.4005L11.8842 43.4565L10.8235 46.6385L10.6654 47.1128L11.1397 46.9547L14.3217 45.894L14.3777 45.8754L14.4194 45.8336L15.8336 44.4194L15.8754 44.3777L15.894 44.3217L16.9547 41.1397L17.1128 40.6654L16.6385 40.8235L13.4565 41.8841ZM25 0.75H24.75V1V2V2.25H25H26H26.25V2V1V0.75H26H25Z" strokeWidth="0.5"/>
            <rect className="purple-light-door" x="8" y="33.534" width="14.8974" height="14.8011" rx="7.34601" transform="rotate(-45 8 33.534)"/>
            <rect className="purple-light-window" x="27" y="19.5" width="6.36396" height="6.36396" rx="3.18198" transform="rotate(-45 27 19.5)"/>
            <defs>
                <radialGradient id="paint-door-diamond" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.4487 40.9346) rotate(90) scale(15.6234 15.725)">
                    <stop offset="0.265625" stopColor="#FF71E8"/>
                    <stop offset="0.484375" stopColor="#FF71E8" stopOpacity="0"/> 
                </radialGradient>
                <radialGradient id="paint-window-diamond" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30.182 22.682) rotate(90) scale(6.71751)">
                    <stop offset="0.265625" stopColor="#FF71E8"/>
                    <stop offset="0.484375" stopColor="#FF71E8" stopOpacity="0"/>
                </radialGradient>
                <linearGradient id="paint-manage-button-back" x1="25.5" y1="0" x2="25.5" y2="51" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5B0D76"/>
                    <stop offset="1" stopColor="#E16885"/>
                </linearGradient>
                <linearGradient id="paint-manage-button-border" x1="25.5" y1="0" x2="25.5" y2="51" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1b174e"/>
                    <stop offset="1" stopColor="#DC2466"/>
                </linearGradient>
            </defs>
        </svg>
    );
}