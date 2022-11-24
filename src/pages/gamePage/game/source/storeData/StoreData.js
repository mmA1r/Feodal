import gamer from '../../../../../store/features/gamer/gamer';
import store from '../../../../../store/store';
import Phaser from "phaser";

export default function StoreData(scene) {
    const Scene = scene;

    setInterval(()=>{
        let units = store.getState().gamer.units;
        let i = 1;
        units.forEach((unit) => {
            if(unit.status==="outOfCastle") {
                setTimeout(()=>{scene.unitsInCastleGroup.getChildren().find(el => el.hp === unit.hp).setData('status', 'stand')}, i*500);
                i +=1;
            }
        })
    }, 500)

}