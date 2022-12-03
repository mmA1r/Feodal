import { useSelector } from 'react-redux';
import './attackButton.scss';

export default function AttackButton() {

    const attack = useSelector((state) => state.action.attack);

    return (
        <svg className={`${attack ? 'attack-active' : 'attack-inactive' }`} viewBox="0 0 155 21"xmlns="http://www.w3.org/2000/svg">
            <path className='attack-button-background' d="M145.237 7.53524L145.129 7.56479L145.029 7.61765L137.529 11.6176L137.248 11.7677L137.106 12.0528L135.106 16.0528L135 16.2639V16.5V20H20.8022L19.9762 16.2831L19.9495 16.1629L19.8944 16.0528L17.8944 12.0528L17.7519 11.7677L17.4706 11.6176L9.97059 7.61765L9.87148 7.56479L9.76312 7.53524L4.69447 6.15288L2.11803 1H152.882L150.306 6.15288L145.237 7.53524Z" fill="#411F1B" stroke="#AAAAAA" strokeWidth="2"/>
            <circle className='attack-button-shadow-cirlce' cx="79.5" cy="10.5" r="5" stroke="black" strokeOpacity="0.3"/>
            <path className='attack-button-shadow' d="M79 3H80V18H79V3Z" fill="black" fillOpacity="0.3"/>
            <path className='attack-button-shadow' d="M72 10H87V11H72V10Z" fill="black" fillOpacity="0.3"/>
            <circle className='attack-button-icon-circle' cx="77.5" cy="10.5" r="5"/>
            <path className='attack-button-icon' d="M77 3H78V18H77V3Z"/>
            <path className='attack-button-icon' d="M70 10H85V11H70V10Z"/>
        </svg>
    );
}