import Phaser from "phaser";
import Unit from '../entites/Unit'
import Castle from '../entites/Castle'
import store from '../../../../../store/store';


export default function getScene(scene) {
    const server = store.getState().server.value;
    let Scene = scene;
    let data;
    setInterval(
        async () => {
            data = (await server.getScene());
            if (data?.units) {
                let units = data.units;
                units.forEach((unit) => {
                    let unitOnScene = Scene.unitsGroup.getChildren().find(el => el.id === unit.id)
                    if (unitOnScene) {
                        unitOnScene.rewriteData(unit);
                    } else {
                        new Unit(Scene,unit);
                    }
                }) 
            }
            if (data?.castles) {
                let castles = data.castles;
                castles.forEach((castle) => {
                    let castleOnScene = Scene.castlesGroup.getChildren().find(el => el.id === castle.id)
                    if (castleOnScene) {
                        castleOnScene.rewriteData(castle);
                    } else {
                        new Castle(Scene,castle);
                    }
                }) 
            }
        }
        ,1000
    ) 
}