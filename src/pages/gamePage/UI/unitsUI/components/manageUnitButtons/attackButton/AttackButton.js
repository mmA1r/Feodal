import { useSelector } from 'react-redux';
import './attackButton.scss';

export default function AttackButton() {

    const attack = useSelector((state) => state.action.attack);

    return (
        <svg className={`${attack ? 'attack-active' : 'attack-inactive' }`} viewBox="0 0 200 20"xmlns="http://www.w3.org/2000/svg">
            <path className='attack-back-button' d="M1.76619 19L12.5662 1H187.434L198.234 19H1.76619Z" stroke="#A9A9A9" strokeWidth="2"/>
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
            <path className='red-shadow-attack-button' d="M12 3L16 5L12.5 4.5L9.5 8L12 3Z" fill="#810202"/>
            <path className='red-shadow-attack-button' d="M7 15V17L12 18H5L7 15Z" fill="#810202"/>
            <path className='red-shadow-attack-button' d="M14.5 2H185.578L185 3H15L14.5 2Z" fill="#810202"/>
            <path className='red-shadow-attack-button' d="M193 17V15L194.5 18H189L193 17Z" fill="#810202"/>
            <path className='red-shadow-attack-button' d="M184 5L187.5 3L190.5 8L187.5 4.5L184 5Z" fill="#810202"/>
            <path className='red-shadow-attack-button' d="M95 11V10H107V11H95Z" fill="#810202"/>
            <path className='red-shadow-attack-button' d="M100 4H101V16H100V4Z" fill="#810202"/>
            <circle className='red-shadow-attack-button-circle' cx="101" cy="10" r="4.5" stroke="#810202"/>
            <circle className='target-cross-attack-button-circle' cx="100" cy="10" r="4.5" stroke="#A9A9A9"/>
            <path className='target-cross-attack-button' d="M99.5 4H100.5V16H99.5V4Z" fill="#A9A9A9"/>
            <path className='target-cross-attack-button' d="M94 10.5V9.5H106V10.5H94Z" fill="#A9A9A9"/>
        </svg>
    );
}