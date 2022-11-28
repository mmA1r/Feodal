import gamer from '../../../../../store/features/gamer/gamer';
import store from '../../../../../store/store';
import Phaser from "phaser";

export default function StoreData(scene) {

    setInterval(()=>{
        let units = store.getState().gamer.units;
        units.forEach((unit) => {
            if(unit.status==="outOfCastle") {
                let castle = scene.castlesGroup.getChildren().find(el => el.id === scene.player);
                let unitInGame = castle.units.getChildren().find(el => el.hp === unit.hp);
                console.log(castle.units.getChildren());
                if (unitInGame) {
                    unitInGame.outCastle();
                }
            }
        })
    }, 100)

}