import React from "react";

import './confirmBorder.scss';

export default class confirmBorder extends React.Component {
    constructor(props) {
        super(props);
        const { side } = props;
        this.side = side;
    }

    render() {
        return(
            <svg className={`beauty-confirm-border ${this.side}`} width="7" height="150" viewBox="0 0 7 150"  xmlns="http://www.w3.org/2000/svg">
                <path className="border-back" d="M3 140.991H4L4.5 132.982V74.9209H2.5V132.982L3 140.991Z" />
                <path className="border-front" d="M3 132.982L3.5 133.983L4 132.982V75.4214H3V132.982Z" />
                <path className="border-back" d="M3.53002 149.921V139.41L2.5 141.491H1.5L0 139.489L1.89713 143.994L3 144.995L2.5 145.996L1.5 144.995L3.53002 149.921Z" />
                <path className="border-back" d="M3.53002 149.921V139.41L4.53002 141.412H5.5L7 139.489L5 143.994L4 144.995L4.53002 145.996L5.5 144.995L3.53002 149.921Z" />
                <path className="border-front" d="M3.50001 149.016V145.714L3.00001 146.997L2.34955 146.264L3.50001 149.016Z" />
                <path className="border-front" d="M3.50001 149.016V145.714L4.00001 146.997L4.66692 146.264L3.50001 149.016Z"/>
                <path className="border-front" d="M2.5 143.493L3 143.994V141.992H2L1.5 141.992L2.5 143.493Z" />
                <path className="border-front" d="M4.5 143.493L4 143.994V141.992L5 141.992L5.5 141.992L4.5 143.493Z" />
                <path className="border-back" d="M3 8.93026H4L4.5 16.9387V75H2.5V16.9387L3 8.93026Z" />
                <path className="border-front" d="M3 16.9387L3.5 15.9377L4 16.9387V74.4995H3V16.9387Z" />
                <path className="border-back" d="M3.53002 0V10.5111L2.5 8.42974H1.5L0 10.4319L1.89713 5.9271L3 4.92607L2.5 3.92498L1.5 4.92604L3.53002 0Z" />
                <path className="border-back" d="M3.53002 0V10.5111L4.53002 8.50896H5.5L7 10.4319L5 5.9271L4 4.92607L4.53002 3.92498L5.5 4.92607L3.53002 0Z"/>
                <path className="border-front" d="M3.50001 0.904655V4.20718L3.00001 2.92396L2.34955 3.65676L3.50001 0.904655Z" />
                <path className="border-front" d="M3.50001 0.904655V4.20718L4.00001 2.92396L4.66692 3.65676L3.50001 0.904655Z" />
                <path className="border-front" d="M2.5 6.42764L3 5.92711V7.92922H2L1.5 7.92923L2.5 6.42764Z" />
                <path className="border-front" d="M4.5 6.42765L4 5.92712V7.92923L5 7.92926L5.5 7.92923L4.5 6.42765Z" />
            </svg>
        );
    }
}