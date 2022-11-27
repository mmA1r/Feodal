import gamer from '../../../../../store/features/gamer/gamer';
import store from '../../../../../store/store';
import Phaser from "phaser";

export default function StoreData(scene) {

    setInterval(()=>{
        let units = store.getState().gamer.units;
        units.forEach((unit) => {
            if(unit.status==="outOfCastle") {
                let unitInGame = scene.castlesGroup.getChildren().find(el => el.id = scene.player).units.getChildren().find(el => el.hp === unit.hp);
                if (unitInGame) {
                    unitInGame.outCastle();
                }
            }
        })
    }, 1000)

}