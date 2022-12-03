import { useSelector } from 'react-redux';
import './moveButton.scss';

export default function MoveButton() {

    const move = useSelector((state) => state.action.move);

    return (
        <svg className={`${move ? 'move-active' : 'move-inactive' }`} viewBox="0 0 154 21" xmlns="http://www.w3.org/2000/svg">
            <path className='move-button-background' d="M144.737 7.53524L144.629 7.56479L144.529 7.61765L137.029 11.6176L136.748 11.7677L136.606 12.0528L134.606 16.0528L134.5 16.2639V16.5V20H20.3022L19.4762 16.2831L19.4495 16.1629L19.3944 16.0528L17.3944 12.0528L17.2519 11.7677L16.9706 11.6176L9.47059 7.61765L9.37148 7.56479L9.26312 7.53524L4.19447 6.15288L1.61803 1H152.382L149.806 6.15288L144.737 7.53524Z" fill="#411F1B" strokeWidth="2"/>
            <path className='move-button-shadow' d="M80 5.57143H81V9H80V5.57143Z" fill="black" fillOpacity="0.3"/>
            <path className='move-button-shadow' d="M80.5 3L82 5.57143H79L80.5 3Z" fill="black" fillOpacity="0.3"/>
            <path className='move-button-shadow' d="M80 15.4286H81V12H80V15.4286Z" fill="black" fillOpacity="0.3"/>
            <path className='move-button-shadow' d="M80.5 18L82 15.4286H79L80.5 18Z" fill="black" fillOpacity="0.3"/>
            <path className='move-button-shadow' d="M85.4286 11V10H82V11H85.4286Z" fill="black" fillOpacity="0.3"/>
            <path className='move-button-shadow' d="M88 10.5L85.4286 9V12L88 10.5Z" fill="black" fillOpacity="0.3"/>
            <path className='move-button-shadow' d="M75.5714 11V10H79V11H75.5714Z" fill="black" fillOpacity="0.3"/>
            <path className='move-button-shadow' d="M73 10.5L75.5714 9V12L73 10.5Z" fill="black" fillOpacity="0.3"/>
            <path className='move-button-icon' d="M78 5.57143H79V9H78V5.57143Z" />
            <path className='move-button-icon' d="M78.5 3L80 5.57143H77L78.5 3Z" />
            <path className='move-button-icon' d="M78 15.4286H79V12H78V15.4286Z" />
            <path className='move-button-icon' d="M78.5 18L80 15.4286H77L78.5 18Z" />
            <path className='move-button-icon' d="M83.4286 11V10H80V11H83.4286Z" />
            <path className='move-button-icon' d="M86 10.5L83.4286 9V12L86 10.5Z" />
            <path className='move-button-icon' d="M73.5714 11V10H77V11H73.5714Z" />
            <path className='move-button-icon' d="M71 10.5L73.5714 9V12L71 10.5Z" />
        </svg>
    );
}