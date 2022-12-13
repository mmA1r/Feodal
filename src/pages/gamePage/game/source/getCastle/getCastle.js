import Castle from '../entites/Castle'
import store from '../../../../../store/store';

export default async function getCastle(player) {
    const server = store.getState().server.value;
    const data = await server.getCastle();
    if (data) {
        console.log(data);
        player.id = data.id;
        player.money = data.money;
        player.scene.store.loadToStore({ money: data.money-0 },'gamer');
        player.scene.store.loadToStore({ level: data.level-0 },'gamer');
        player.scene.store.loadToStore({castleUpdateCost:data.castleUpgradeCost-0},'gamer');
        player.scene.cameras.main.centerOn(data.posX * 64, data.posY * 64);
    }
}