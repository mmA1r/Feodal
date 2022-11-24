import './closeWindow.scss';

export default function CloseWindow() {

    return (
        <svg className='cross-button' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className='cross-frame' cx="10" cy="10" r="10" fill="#462E2E"/>
            <path className='cross-back' d="M19.5 10C19.5 14.9706 14.9706 19.5 10 19.5C5.02946 19.5 0.500015 14.9842 0.500015 10.0137C0.500015 5.04309 5.02945 0.5 10 0.5C14.9706 0.5 19.5 5.02944 19.5 10Z" fill="#92603B"/>
            <path className='cross' d="M4.55556 16.6527L3.36016 15.5L8.87724 10.18L9.06386 10L8.87724 9.82005L3.36016 4.50001L4.55556 3.3473L10.0857 8.67997L10.2593 8.8473L10.4328 8.67997L15.4444 3.8473L16.6398 5L11.6413 9.82005L11.4547 10L11.6413 10.18L16.6398 15L15.4444 16.1527L10.4328 11.32L10.2593 11.1527L10.0857 11.32L4.55556 16.6527Z" fill="#D5A17A" stroke="#4A3939" strokeWidth="0.5"/>
        </svg>
    );
}