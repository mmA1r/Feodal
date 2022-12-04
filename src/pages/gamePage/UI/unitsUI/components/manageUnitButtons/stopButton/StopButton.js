import { useSelector } from 'react-redux';
import './stopButton.scss';

export default function StopButton() {

    const stop = useSelector((state) => state.action.stop);

    return (
        <svg className={`${stop ? 'stop-active' : 'stop-inactive' }`} width="155" height="21" viewBox="0 0 155 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className='stop-button-background' d="M145.237 7.53524L145.129 7.56479L145.029 7.61765L137.529 11.6176L137.248 11.7677L137.106 12.0528L135.106 16.0528L135 16.2639V16.5V20H20.8022L19.9762 16.2831L19.9495 16.1629L19.8944 16.0528L17.8944 12.0528L17.7519 11.7677L17.4706 11.6176L9.97059 7.61765L9.87148 7.56479L9.76312 7.53524L4.69447 6.15288L2.11803 1H152.882L150.306 6.15288L145.237 7.53524Z" fill="#411F1B" stroke="#AAAAAA" strokeWidth="2"/>
            <path className='stop-button-shadow' d="M76.5 13.8044L84.0307 6.27371L84.7378 6.98082L77.2071 14.5115L76.5 13.8044Z" fill="black" fillOpacity="0.3"/>
            <path className='stop-button-shadow' d="M86 10.5C86 13.5376 83.5376 16 80.5 16C77.4624 16 75 13.5376 75 10.5C75 7.46243 77.4624 5 80.5 5C83.5376 5 86 7.46243 86 10.5Z" stroke="black" strokeOpacity="0.3"/>
            <rect className='stop-button-icon' x="74.0219" y="13.771" width="10.65" height="1" transform="rotate(-45 74.0219 13.771)" fill="#AAAAAA"/>
            <path className='stop-button-icon-circle' d="M83.5233 10.4679C83.5233 13.5055 81.0608 15.9679 78.0233 15.9679C74.9857 15.9679 72.5233 13.5055 72.5233 10.4679C72.5233 7.43033 74.9857 4.9679 78.0233 4.9679C81.0608 4.9679 83.5233 7.43033 83.5233 10.4679Z" stroke="#AAAAAA"/>
        </svg>

    );
}