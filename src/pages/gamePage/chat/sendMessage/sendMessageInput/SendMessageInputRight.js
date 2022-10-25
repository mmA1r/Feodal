import React from "react";

import './sendMessageInput.scss';

export default class SendMessageInputRight extends React.Component {
    render() {
        return(
            <svg className="send-message-input-beauty-version-right" width="6" height="23" viewBox="0 0 6 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1" height="13" transform="matrix(-1 0 0 1 5 5)" fill="#FCA626"/>
                <rect width="1" height="15" transform="matrix(-1 0 0 1 6 4)" fill="#C17400"/>
                <path d="M6 0H1L0 2L1 5L4 6L6 5V0Z" fill="#FCA626"/>
                <path d="M4 2H2L1 5L4 4V2Z" fill="#BA07A8"/>
                <path d="M6 0H5V5.5L6 5V0Z" fill="#FF46ED"/>
                <path d="M6 0H1L0.5 1H6V0Z" fill="#FF46ED"/>
                <rect width="2" height="2" transform="matrix(-1 0 0 1 4 2)" fill="#FF46ED"/>
                <path d="M6 23H1L0 21L1 18L4 17L6 18V23Z" fill="#FCA626"/>
                <path d="M4 21H2L1 18L4 19V21Z" fill="#BA07A8"/>
                <path d="M6 23H5V17.5L6 18V23Z" fill="#FF46ED"/>
                <path d="M6 23H1L0.5 22H6V23Z" fill="#FF46ED"/>
                <rect x="4" y="21" width="2" height="2" transform="rotate(180 4 21)" fill="#FF46ED"/>
            </svg>
        );
    }
}