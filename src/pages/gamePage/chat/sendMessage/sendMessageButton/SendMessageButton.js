import React from "react";

import './sendMessageButton.scss';

export default function SendMessageButton() {
    return(
        <svg className="send-message-button-beauty-version" viewBox="0 0 46 23" xmlns="http://www.w3.org/2000/svg">
            {/* frame */}
            <rect className="background-send-button"/>
            <rect className="border-send-button" x="1" y="1"/>
            {/* scroll */}
            <path className="scroll" d="M16.0769 4H22.2308H25.3077H26.8461L28.3846 4.46181L28.8974 5.38542L28.8974 6.77083L28.8974 9.54167L28.8974 15.0833H16.5897V9.54167V7.69444L16.5897 6.77083L17.1025 5.38542L16.5897 4.46181L16.0769 4Z"/>
            <path className="scroll" d="M13.5128 4.46181L14.5385 4L15.5641 4.46181L16.0769 5.38542L15.5641 6.30903L14.5385 6.77083L13.5128 6.30903L13 5.38542L13.5128 4.46181Z"/>
            <path className="scroll" d="M20.8852 16.0069H33V17.3924L32.4872 18.316L31.9744 18.7778H31.0769H29.1539H25.3077H17.6154L19.8595 18.316L20.3724 17.8542L20.8852 16.9306V16.0069Z"/>
            <path className="scroll" d="M16.5898 15.0833H19.6667V16.4688L19.1539 17.3924L18.1282 17.8542L17.1026 17.3924L16.5898 16.4688V15.0833Z"/>
            {/* scroll-active */}
            <path className="scroll-active" d="M11.3 9L23 9.65L34.7 9V14.2L23 13.55L11.3 14.2V9Z" />
            <circle className="scroll-active scroll-circle" cx="23" cy="11.6" r="3.1"/>
            <path className="scroll-active" d="M10 9.65001H10.65V13.55H10V9.65001Z"/>
            <path className="scroll-active" d="M35.35 9.65001H36V13.55H35.35V11.6V9.65001Z"/>
            {/* border left */}
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