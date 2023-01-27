import Castle from '../entites/Castle'
import store from '../../../../../store/store';

export default async function getCastle(player) {
    const server = store.getState().server.value;
    const data = await server.getCastle();
    if (data) {
        player.id = data.id - 0;
        player.money = data.money - 0;
        const time = Math.round(data.nextRentTime*1000);
        player.scene.store.loadToStore({ money: data.money - 0 }, 'gamer');
        player.scene.store.loadToStore({ level: data.level - 0 }, 'gamer');
        player.scene.store.loadToStore({ castleUpdateCost: data.castleUpgradeCost - 0 }, 'gamer');
        player.scene.store.loadToStore({ nextRentTime: time}, 'gamer');
        player.getCastle = player.scene.updater.add(player, time+500, 'rent', true);
    }
}