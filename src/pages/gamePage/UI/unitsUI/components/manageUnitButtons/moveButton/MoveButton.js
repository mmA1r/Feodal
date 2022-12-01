import { useSelector } from 'react-redux';
import './moveButton.scss';

export default function MoveButton() {

    const move = useSelector((state) => state.action.move);

    return (
        <svg className={`${move ? 'move-active' : 'move-inactive' }`} width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className='move-back-button' d="M1.76619 19L12.5662 1H187.434L198.234 19H1.76619Z" fill="#42773D" stroke="#A9A9A9" strokeWidth="2"/>
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
            <path d="M102.436 10.0884C102.436 12.3642 104.854 13.6205 102.883 13.6205C100.911 13.6205 99.3121 12.9529 99.3121 10.677C99.3121 8.40118 101.357 5.37885 103.329 5.37885C105.301 5.37885 102.436 7.81249 102.436 10.0884Z" fill="#D9D9D9"/>
            <path d="M97.4036 11.2779C98.581 13.6327 96.5482 13.0247 95.2477 13.0247C93.9472 13.0247 98.1911 6.08358 98.1911 4.78309C98.1911 3.4826 100.423 4.1944 101.723 4.1944C103.024 4.1944 96.0873 8.64522 97.4036 11.2779Z" fill="#D9D9D9"/>
            <path d="M107.97 15.9874C107.97 15.9874 107.831 15.983 108 15.9874H100.936C100.936 15.9874 101.971 14.2214 104.453 13.6327C106.395 13.6327 107.97 14.6869 107.97 15.9874Z" fill="#D9D9D9"/>
            <path d="M102.887 14.81C104.064 15.9874 101.626 16 100 16C98.9441 14.81 96.4113 13.044 95.2339 13.044C95.2339 12.0686 95.3744 10.6892 97 10.6892C97.5887 11.8666 101.121 14.81 102.887 14.81Z" fill="#D9D9D9"/>
        </svg>

    );
}