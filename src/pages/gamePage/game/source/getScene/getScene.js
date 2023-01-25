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
            if (data?.castles) {
                const castles = scene.castlesGroup.getChildren();
                data.castles.forEach((castleData) => {
                    const castle = castles.find(el => el.id == castleData.id - 0);
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
                const villages = scene.villagesGroup.getChildren();
                data.villages.forEach((villageData) => {
                    const village = villages.find(el => el.id == villageData.id - 0);
                    (village) ? village.rewriteData(villageData) : new Village(scene, villageData);
                })
                villages.forEach((village) => {
                    if (village.isUpdated) {
                        village.isUpdated = false;
                    }
                    else {
                        village.killed();
                        console.log(village.isUpdated)
                    }

                })
            }
            if (data?.units) {
                const units = scene.unitsGroup.getChildren();
                data.units.forEach((unitData) => {
                    const unit = units.find(el => el.id == unitData.id - 0);
                    if (unit) {
                        unit.rewriteData(unitData);
                    }
                    else {
                        switch (unitData.type) {
                            case "1":
                                new Soldier(scene, scene.player, unitData);
                                break;
                            case "2":
                                new Assasin(scene, scene.player, unitData);
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