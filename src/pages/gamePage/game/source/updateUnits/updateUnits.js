import store from '../../../../../store/store';

export default function updateUnits(scene) {
    const server = store.getState().server.value;
    scene.updateMyUnitsGroup = scene.add.group();
    scene.updateOtherUnitsGroup = scene.add.group();
    scene.updateVillagesGroup = scene.add.group();
    scene.deadUnitsGroup = scene.add.group();
    const updateUnits = setInterval(
        async() => {
            if (scene.updateMyUnitsGroup.getChildren()[0] || scene.updateOtherUnitsGroup.getChildren()[0] || scene.updateVillagesGroup.getChildren()[0]) {
                let updateMyUnitsGroup = scene.updateMyUnitsGroup.getChildren();
                let updateOtherUnitsGroup = scene.updateOtherUnitsGroup.getChildren();
                let updateVillagesGroup = scene.updateVillagesGroup.getChildren();
                let myUnits = [];
                let otherUnits = [];
                let villages = [];
                
                let myUnit = updateMyUnitsGroup[0];
                while (myUnit) {
                    myUnits.push({
                        id: myUnit.id,
                        hp: myUnit.hp,
                        posX: myUnit.x / 64,
                        posY: myUnit.y / 64,
                        status: myUnit.status,
                        direction: myUnit.direction.angle
                    })
                    scene.updateMyUnitsGroup.remove(myUnit);
                    myUnit = updateMyUnitsGroup[0];
                }

                let enemyUnit = updateOtherUnitsGroup[0];
                while (enemyUnit) {
                    otherUnits.push({
                        id: enemyUnit.id,
                        dmg: enemyUnit.sumDmg
                    });
                    enemyUnit.postUpdater();
                    enemyUnit = updateOtherUnitsGroup[0];
                }


                let village = updateVillagesGroup[0]
                while(village){
                    villages.push({
                        id: village.id,
                        dmg: village.dmg
                    });
                    village.postUpdater();
                    village = updateVillagesGroup[0]
                }
                await server.updateUnits({myUnits,otherUnits,villages});
                /*let deadUnit = scene.deadUnitsGroup.getChildren()[0];
                while (deadUnit) {
                    deadUnit.killed();
                    deadUnit = scene.deadUnitsGroup.getChildren()[0];
                }*/
                /*scene.updateMyUnitsGroup.clear();
                scene.updateOtherUnitsGroup.clear();
                scene.updateVillagesGroup.clear();*/
            }
        }
        ,150
    )

    return updateUnits;
}