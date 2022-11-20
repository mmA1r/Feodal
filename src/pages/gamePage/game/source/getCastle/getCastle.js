import Phaser from "phaser";
import Castle from '../entites/Castle'
import store from '../../../../../store/store';

export default async function getCastle(scene, myCastle) {
    const server = store.getState().server.value;
    let data = await server.getCastle();
    if (data) {
        let castle = myCastle.getChildren().find(el => el.id === data.id)
        if (myCastle.getChildren().find(el => el.id === castle.id)) {
            castle.rewriteData(data);
        } 
        else {
            castle = new Castle(scene,data);
            myCastle.add(castle);
        }
    }
}