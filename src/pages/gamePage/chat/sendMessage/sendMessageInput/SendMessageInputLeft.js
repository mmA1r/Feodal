import React from "react";

import './sendMessageInput.scss';

export default class SendMessageInputLeft extends React.Component {
    render() {
        return(
            <svg className="send-message-input-beauty-version-left" width="6" height="23" viewBox="0 0 6 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="5" width="1" height="13" fill="#FCA626"/>
                <rect y="4" width="1" height="15" fill="#C17400"/>
                <path d="M0 0H5L6 2L5 5L2 6L0 5V0Z" fill="#FCA626"/>
                <path d="M2 2H4L5 5L2 4V2Z" fill="#BA07A8"/>
                <path d="M0 0H1V5.5L0 5V0Z" fill="#FF46ED"/>
                <path d="M0 0H5L5.5 1H0V0Z" fill="#FF46ED"/>
                <rect x="2" y="2" width="2" height="2" fill="#FF46ED"/>
                <path d="M0 23H5L6 21L5 18L2 17L0 18V23Z" fill="#FCA626"/>
                <path d="M2 21H4L5 18L2 19V21Z" fill="#BA07A8"/>
                <path d="M0 23H1V17.5L0 18V23Z" fill="#FF46ED"/>
                <path d="M0 23H5L5.5 22H0V23Z" fill="#FF46ED"/>
                <rect width="2" height="2" transform="matrix(1 0 0 -1 2 21)" fill="#FF46ED"/>
            </svg>
        );
    }
}