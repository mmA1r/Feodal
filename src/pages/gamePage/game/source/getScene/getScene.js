import Phaser from "phaser";
import Unit from '../entites/Unit'
import store from '../../../../../store/store';


export default function getScene(scene, groups) {
    const server = store.getState().server.value;
    let Scene = scene;
    let data;
    setInterval(
        async () => {
            data = (await server.getScene());
            if (data?.units) {
                let units = data.units;
                await units.forEach((unit) => {
                    let unitOnScene = Scene.unitsGroup.getChildren().find(el => el.id === unit.id)
                    if (unitOnScene) {
                        unitOnScene.rewriteData(unit);
                    } else {
                        let newUnit = new Unit(Scene,unit);
                        Scene.unitsGroup.add(newUnit);
                    }
                    
                }) 
            }
        }
        ,1000
    ) 
}