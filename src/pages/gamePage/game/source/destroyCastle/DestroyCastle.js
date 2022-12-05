import store from '../../../../../store/store';
export default async function DestroyCastle(id) {
    const server = store.getState().server.value;
    let data = await server.destroyCastle(id);
    if (data) {
        scene.store.loadToStore({ money: data.money-0 },'gamer');        
    }
}