import Phaser from "phaser";
import Castle from '../entites/Castle'
import store from '../../../../../store/store';

export default async function getCastle(scene) {
    const server = store.getState().server.value;
    let data = await server.getCastle();
    console.log(data);
    if (data) {
        scene.MyCastle = data;
        scene.player = data.id;
    }
}