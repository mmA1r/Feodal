import React from "react";

import './miniMapFrame.scss';

export default function MiniMapFrame() {
    return (
        <svg className="mini-map-frame" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <path className="mini-map-frame-border-1" d="M286 285H292V292H285V286L286 285ZM284 277V283L283 284H277V277H284Z" strokeWidth="2" strokeLinejoin="bevel"/>
            <path className="mini-map-frame-border-1" d="M235.061 282.123L254.062 263.121L286.504 295.562L221.621 295.562L231.061 286.123L231.472 284.772L230.912 281.94L233.688 282.53L235.061 282.123ZM281.686 235.623L282.112 234.368L281.768 231.742L284.453 232.053L285.686 231.623L295.125 222.184V287.066L262.684 254.625L281.686 235.623Z" strokeWidth="3" strokeLinejoin="bevel"/>
            <path className="mini-map-frame-back" d="M291.329 299.25H5.355L7.105 298.75H13H13.29L13.5045 298.555L18.79 293.75H291.5H291.544L291.588 293.745L291.945 293.703L291.329 299.25ZM292.838 299.25L293.474 293.523L299.25 292.843V299.25H292.838ZM293.75 291V18.3107L298.53 13.5303L298.75 13.3107V13V7.105L299.25 5.355V291.333L293.644 291.993L293.745 291.083L293.75 291.042V291Z" strokeWidth="1.5"/>
            <path className="mini-map-frame-jewel" d="M293.5 293.5L299 293V299H293L293.5 293.5Z"/>
            <path className="mini-map-frame-border-2" d="M222 293H226V300H222V293Z"/>
            <path className="mini-map-frame-border-2" d="M294 226V222H301V226H294Z"/>
        </svg>
    );
}