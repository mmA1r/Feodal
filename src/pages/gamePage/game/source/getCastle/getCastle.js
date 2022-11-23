import Phaser from "phaser";
import Castle from '../entites/Castle'
import store from '../../../../../store/store';

export default async function getCastle(scene) {
    const server = store.getState().server.value;
    let data = await server.getCastle();
    console.log(data);
    if (data) {
        scene.store.loadToStore({money:data.money-0},'gamer');
        scene.myCastle = {
            x: Math.round(data.posX * 64),
            y: Math.round(data.posY * 64),
            level: data.level
        };
        scene.cameras.main.centerOn(scene.myCastle.x,scene.myCastle.y);
        /*scene.myCastle.queryUnits = scene.add.group();
        scene.myCastle.free = true;
        scene.myCastle.enter = function(unit){
            scene.myCastle.queryUnits.add(unit);
            if (scene.myCastle.free) {
                scene.myCastle.queryUnits.enterUnits();
            }
        }
        scene.myCastle.queryUnits.enterUnits = function(){
            scene.myCastle.free = false;
            let unit = scene.myCastle.queryUnits.getChildren()[0];
            let i = 1;
            console.log('enterUnit');
            while (unit) {
                setTimeout((unit)=> {
                        unit.enterCastle()
                }, 500*i)
                i += 1;
                scene.myCastle.queryUnits.remove(unit);
                unit = scene.myCastle.queryUnits.getChildren()[0]
            }
            scene.myCastle.free = true;
        }*/
        scene.player = data.id;
    }
}