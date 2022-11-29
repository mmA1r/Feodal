import Phaser from "phaser";
import Unit from '../entites/Unit'
import Castle from '../entites/Castle'
import store from '../../../../../store/store';


export default function getScene(scene) {
    const server = store.getState().server.value;
    const Scene = scene;
    const getScene = setInterval(
        async () => {
            const data = (await server.getScene());
            if (data?.castles) {
                let castles = data.castles;
                castles.forEach((castle) => {
                    let castleOnScene = scene.castlesGroup.getChildren().find(el => el.id === castle.id);
                    if (castleOnScene) {
                        castleOnScene.rewriteData(castle);
                    } else {
                        new Castle(Scene,castle);
                    }
                }) 
            }
            if (data?.units) {
                data.units.forEach((unit) => {
                    let unitOnScene = Scene.unitsGroup.getChildren().find(el => el.id === unit.id)
                    if (unitOnScene) {
                        unitOnScene.rewriteData(unit);
                    } else {
                        new Unit(scene,unit);
                    }
                }) 
            }
        }
        ,100
    )

    return getScene;
}