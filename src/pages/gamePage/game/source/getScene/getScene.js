import Unit from '../entites/Unit'
import Castle from '../entites/Castle'
import store from '../../../../../store/store';
import Village from "../entites/Village";


export default function getScene(scene) {
    const server = store.getState().server.value;
    const Scene = scene;
    const getScene = setInterval(
        async () => {
            const data = (await server.getScene());
            if (data?.castles[0]) {
                data.castles.forEach((castleData) => {
                    if (!scene.castlesGroup.getChildren().find(el => el.id === castleData.id)) {
                        new Castle(scene,castleData);
                    }
                })
                scene.castlesGroup.getChildren().forEach((castle)=>{
                    const castleOnServer = data.castles.find((c) => {
                        return c.id === castle.id;
                    })
                    if (castleOnServer) {
                        castle.rewriteData(castleOnServer);
                    }
                    else {
                        castle.killed();
                    }
                })
            }
            if (data?.villages[0]) {
                data.villages.forEach((villageData) => {
                    if (!scene.villagesGroup.getChildren().find(el => el.id === villageData.id)) {
                        new Village(scene,villageData);
                    }
                })
                scene.villagesGroup.getChildren().forEach((village)=>{
                    const villageOnServer = data.villages.find((v) => {
                        return v.id === village.id;
                    })
                    if (villageOnServer) {
                        village.rewriteData(villageOnServer);
                    }
                    else {
                        village.killed();
                    }
                })
            }
            if (data?.units[0]) {
                data.units.forEach((unitData) => {
                    if (!scene.unitsGroup.getChildren().find(el => el.id === unitData.id)) {
                        new Unit(scene,unitData);
                    }
                })
                scene.unitsGroup.getChildren().forEach((unit)=>{
                    const unitOnServer = data.units.find((u) => {
                        return u.id === unit.id;
                    })
                    if (unitOnServer) {
                        unit.rewriteData(unitOnServer);
                    }
                    else {
                        unit.killed()
                    }
                    
                })
            }
        }
        ,90
    )

    return getScene;
}