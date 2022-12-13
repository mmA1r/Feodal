import store from '../../../../../store/store';
export default async function DestroyCastle(castle) {
    const server = store.getState().server.value;
    let data = await server.destroyCastle(castle.id);
    if (data) {
        castle.scene.store.loadToStore({ money: data.money-0 },'gamer');        
    }
}