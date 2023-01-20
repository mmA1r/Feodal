import Unit from '../entites/Unit'
import Castle from '../entites/Castle'
import store from '../../../../../store/store';
import Village from "../entites/Village";
import Soldier from '../entites/Soldier';
import Assasin from '../entites/Assassin';

export default function getScene(scene) {
    const server = store.getState().server.value;
    const getScene = setInterval(
        async () => {
            const data = (await server.getScene());
            console.log(data);
            if (data?.castles) {
                const castles = scene.castlesGroup.getChildren();
                data.castles.forEach((castleData) => {
                    const castle = castles.find(el => el.id === castleData.id);
                    if (castle){
                        castle.rewriteData(castleData);
                    }
                    else {
                        new Castle(scene, castleData);
                    }
                });
                castles.forEach((castle) => {
                    if (castle.isUpdated) {
                        castle.isUpdated = false;
                    }
                    else {
                        castle.killed();
                    }
                })
            }
            if (data?.villages) {
                data.villages.forEach((villageData) => {
                    if (!scene.villagesGroup.getChildren().find(el => el.id === villageData.id)) {
                        new Village(scene, villageData);
                    }
                })
                scene.villagesGroup.getChildren().forEach((village) => {
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
            if (data?.units) {
                const units = scene.unitsGroup.getChildren();
                data.units.forEach((unitData) => {
                    const unit = units.find(el => el.id === unitData.id);
                    if (unit) {
                        unit.rewriteData(unitData);
                    }
                    else {
                        switch (unitData.type) {
                            case "1":
                                new Soldier(scene, unitData);
                                break;
                            case "2":
                                new Assasin(scene, unitData);
                                break;
                        }
                    }
                })
                units.forEach((unit) => {
                    if (unit.isUpdated) {
                        unit.isUpdated = false;
                    }
                    else {
                        unit.killed();
                    }

                })
            }
        }
        , 90
    )

    return getScene;
}