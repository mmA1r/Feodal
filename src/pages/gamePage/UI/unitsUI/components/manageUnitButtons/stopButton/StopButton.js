import { useSelector } from 'react-redux';
import './stopButton.scss';

export default function StopButton() {

    const stop = useSelector((state) => state.action.stop);

    return (
        <svg className={`${stop ? 'stop-active' : 'stop-inactive' }`} width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className='stop-back-button' d="M1.76619 19L12.5662 1H187.434L198.234 19H1.76619Z" fill="#A77121" stroke="#A9A9A9" strokeWidth="2"/>
            <path d="M186 1H188V3L184 5L186 1Z" fill="#A9A9A9"/>
            <path d="M187.5 3L188 1L190 6L190.5 8L187.5 3Z" fill="#E6E6E6"/>
            <path d="M188 1V3L184 5L188 1Z" fill="#E6E6E6"/>
            <path d="M14 1H12V3L16 5L14 1Z" fill="#A9A9A9"/>
            <path d="M12.5 3L12 1L10 6L9.5 8L12.5 3Z" fill="#E6E6E6"/>
            <path d="M12 1V3L16 5L12 1Z" fill="#E6E6E6"/>
            <path d="M191 18H196V19H193L191 18Z" fill="#E6E6E6"/>
            <path d="M195 19H197V17L193 15L195 19Z" fill="#E6E6E6"/>
            <path d="M196 18L197 19V17L193 15L196 18Z" fill="#A9A9A9"/>
            <path d="M9 18H4V19H7L9 18Z" fill="#E6E6E6"/>
            <path d="M5 19H3V17L7 15L5 19Z" fill="#E6E6E6"/>
            <path d="M4 18L3 19V17L7 15L4 18Z" fill="#A9A9A9"/>
            <path d="M7 19H193L192 18H8L7 19Z" fill="#E6E6E6"/>
            <circle cx="100" cy="10" r="6.5" stroke="#E6E6E6"/>
            <path d="M95 6L96 5L105 14L104 15L95 6Z" fill="#E6E6E6"/>
        </svg>
    );
}