import React from "react";

import './logoutIcon.scss'

export default class LogoutIcon extends React.Component {

    render() {
        return(
            <div className="logout-icon">
                <svg id='exit-svg' width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* frame */}
                    <circle className="icon-border" cx="25.5" cy="25.5" r="23.5"/>
                    <circle className="icon-background" cx="25.5" cy="25.5" r="23"/>
                    {/* icon */}
                    <rect className="icon-inside" x="13" y="32" width="5.20833" height="5"/>
                    <rect className="icon-inside" x="13" y="25" width="5.20833" height="5"/>
                    <path className="icon-inside" d="M21.3333 12H29.6667L28.2778 17H22.7222L21.3333 12Z"/>
                    <path className="icon-inside" d="M13.8681 18L18.2083 21.3333V23H13L13.8681 18Z"/>
                    <path className="icon-inside" d="M19.25 13L21.3333 17.6667L19.25 20L15.0833 16.5L19.25 13Z"/>
                    <path className="icon-inside" d="M31.75 13L29.6667 17.6667L31.75 20L35.9167 16.5L31.75 13Z"/>
                    <path className="icon-inside" d="M37.1319 18L32.7917 21.3333V23H38L37.1319 18Z"/>
                    <rect className="icon-inside" x="32.7917" y="25" width="5.20833" height="5"/>
                    <rect className="icon-inside" x="32.7917" y="32" width="5.20833" height="5"/>
                    <ellipse className="icon-inside icon-door" cx="26.0208" cy="28.5" rx="1.5625" ry="1.5"/>
                    <rect className="icon-inside icon-door" x="20.2917" y="21" width="1.04167" height="14"/>
                    <rect className="icon-inside icon-door" x="23.4167" y="19" width="1.04167" height="16"/>
                    <rect className="icon-inside icon-door" x="26.5417" y="21" width="1.04167" height="5"/>
                    <rect className="icon-inside icon-door" x="26.5417" y="31" width="1.04167" height="4"/>
                    <path d="M10 0L10 15L-4.17233e-07 15L5.29412 14L5.29412 0L10 0Z"/>
                    <rect className="open-door" x="3" y="27.4037" width="31.6836" height="31.4793" transform="rotate(-45 3 27.4037)"/>
                    {/* light */}
                    <path className="light" d="M33 21V36H23L28.2941 35L28.2941 21H33Z"/>
                    {/* jewelry-border */}
                    <path className="jewerly-border" d="M22 4L25.5 6.6228e-08L29 4L25.5 8L22 4Z"/>
                    <path className="jewerly-border" d="M7.62939e-06 25.5L1.50001 24L3.00001 25.5L1.50001 27L7.62939e-06 25.5Z"/>
                    <path className="jewerly-border" d="M24 49.5L25.5 48L27 49.5L25.5 51L24 49.5Z"/>
                    <path className="jewerly-border" d="M48 25.5L49.5 24L51 25.5L49.5 27L48 25.5Z"/>
                    {/* jewelry */}
                    <path className="jewerly-background" d="M22.4375 4.03554L25.5311 0.500004L28.6247 4.03554L25.5311 7.57107L22.4375 4.03554Z"/>
                    <path className="jewerly" d="M23.3125 3L25.5311 0.499992L27.6875 3L25.5311 7.53553L23.3125 3Z"/>
                    <path d="M24.625 2.5L25.5 0.5L26.375 2.5L25.5 4L24.625 2.5Z" fill="white"/>
                    <path className="jewerly" d="M48.5 25.5L49.5 24.5L50.5 25.5L49.5 26.5L48.5 25.5Z"/>
                    <path className="jewerly" d="M24.5 49.5L25.5 48.5L26.5 49.5L25.5 50.5L24.5 49.5Z"/>
                    <path className="jewerly" d="M0.500008 25.5L1.50001 24.5L2.50001 25.5L1.50001 26.5L0.500008 25.5Z"/>

                    {/* gradients */}
                    <defs>
                        <linearGradient id="light" x1="33" y1="28.5" x2="28.2941" y2="28.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#9BBDFF" stopOpacity="0"/>
                            <stop offset="0.859375" stopColor="#FA22FE"/>
                        </linearGradient>
                        <linearGradient id="background-gradient" x1="25.5" y1="0" x2="25.5" y2="51" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#5B0D76"/>
                            <stop offset="1" stopColor="#E16885"/>
                        </linearGradient>
                        <linearGradient id="border-gradient" x1="25.5" y1="0" x2="25.5" y2="51" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1b174e"/>
                            <stop offset="1" stopColor="#DC2466"/>
                        </linearGradient>
                        <radialGradient id="open-door-light" cx="0" cy="0" r="0.9" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.8418 43.1434) rotate(90) scale(33.2282 33.4438)">
                            <stop offset="0.265625" stopColor="#FF71E8"/>
                            <stop offset="0.484375" stopColor="#FF71E8" stopOpacity="0"/>
                        </radialGradient>
                    </defs>
                </svg>             
            </div>
        );
    }
}