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
                let myUnits = scene.updateMyUnitsGroup.getChildren().map((unit) => {
                    if (unit.hp<=0) scene.deadUnitsGroup.add(unit);
                    return {
                        id: unit.id,
                        hp: unit.hp,
                        posX: unit.x / 64,
                        posY: unit.y / 64,
                        status: unit.status,
                        direction: unit.direction.angle
                    }
                });
                let otherUnits=scene.updateOtherUnitsGroup.getChildren().map((unit) => {
                    if (unit.hp<=0) scene.deadUnitsGroup.add(unit);
                    return {
                        id: unit.id,
                        hp: unit.hp
                    }
                });
                let villages=scene.updateVillagesGroup.getChildren().map((village) => {
                    return {
                        id: village.id,
                        population: village.population
                    }
                });
                await server.updateUnits({myUnits,otherUnits,villages});
                let deadUnit = scene.deadUnitsGroup.getChildren()[0];
                while (deadUnit) {
                    deadUnit.killed();
                    deadUnit = scene.deadUnitsGroup.getChildren()[0];
                }
                scene.updateMyUnitsGroup.clear();
                scene.updateOtherUnitsGroup.clear();
                scene.updateVillagesGroup.clear();
            }
        }
        ,150
    )

    return updateUnits;
}