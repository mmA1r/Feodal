import './withdrawButton.scss';

export default function WithdrawButton() {

    return (
        <svg className='custom-withdraw-button' viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg">
            <rect className='wooden-background'/>
            <path className='wooden-frame' d="M0 0H76V4H4V26H76V4V0H80V26V30H3.5H0V3.58974V0Z"/>
            <path className='brighter-wooden-frame' d="M1.50002 1.5H78.5L76 4H4V26H76V4L78.5 1.5V28.5H1.50002V1.5Z"/>

            <path className='stone'd="M80 7L73 7L80 -2.14373e-07L80 7Z"/>
            <path className='stone'd="M-1.82402e-05 23H6.99999L-9.7434e-06 30L-1.82402e-05 23Z"/>
            <path className='stone' d="M80 23L80 30L73 23L80 23Z"/>
            <path className='stone'd="M2.40734e-07 7.00001L-2.17782e-06 -3.00512e-06L7 7L2.40734e-07 7.00001Z"/>

            <path className='bright-stone' d="M73 30L73 23L80 30L73 30Z"/>
            <path className='bright-stone' d="M73 7L73 -7.58104e-07L80 3.60007e-07L73 7Z"/>
            <path className='bright-stone' d="M7 7L2.40798e-07 2.40798e-07H7L7 7Z"/>
            <path className='bright-stone' d="M1.25047e-07 30L7 23V30L1.25047e-07 30Z"/>

            <path className='brighter-wooden-frame' d="M0 20L1.5 18V23H0V20Z"/>
            <path className='brighter-wooden-frame' d="M80 20L78.5 18V23H80V20Z"/>
            <path className='brighter-wooden-frame' d="M71 26L73 24V30L71 28.5V26Z"/>
            <path className='brighter-wooden-frame' d="M9 26L7 24V30L9 28.5V26Z"/>
            <path className='brighter-wooden-frame' d="M74 23L76 21V23H74Z"/>
            <path className='brighter-wooden-frame' d="M4 21L6 23H4V21Z"/>
        </svg>
    );
}