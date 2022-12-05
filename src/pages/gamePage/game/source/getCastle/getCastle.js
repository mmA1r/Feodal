import Castle from '../entites/Castle'
import store from '../../../../../store/store';

export default async function getCastle(scene) {
    const server = store.getState().server.value;
    let data = await server.getCastle();
    if (data) {
        scene.store.loadToStore({ money: data.money-0 },'gamer');
        scene.store.loadToStore({ level: data.level-0 },'gamer');
        scene.store.loadToStore({castleUpdateCost:data.castleUpgradeCost-0},'gamer');
        scene.player = data.id;
        scene.myCastle = {
            x: Math.round(data.posX * 64),
            y: Math.round(data.posY * 64),
            level: data.level
        };
        scene.cameras.main.centerOn(scene.myCastle.x, scene.myCastle.y);
        
    }
}