import store from '../../../../../store/store';

export default function updateUnits(scene) {
    const server = store.getState().server.value;
    scene.updateMyUnitsGroup = scene.add.group();
    setInterval(
        async() => {
            if (scene.updateMyUnitsGroup.getChildren()[0]) {
                let myUnits = scene.updateMyUnitsGroup.getChildren().map((unit) => {
                    return {
                        id: unit.id,
                        hp: unit.hp,
                        posX: unit.x / 64,
                        posY: unit.y / 64,
                        status: unit.status,
                        direction: unit.direction.angle
                    }
                });
                let otherUnits=[];
                let villages = [];
                server.updateUnits({myUnits,otherUnits,villages});
                scene.updateMyUnitsGroup.clear();
            }
        }
        ,150
    )
}