import React from "react";

export default function AutoUpdater (scene){
    const Scene = scene;
    //const AutoUpdater = useSelector((state) => state.unit.status);

    return (
        <div id="autoUpdater">{Scene.data.set('status',AutoUpdater)}</div>
    )
}