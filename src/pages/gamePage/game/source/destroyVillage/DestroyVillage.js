import store from '../../../../../store/store';
export default async function DestroyVillage(village) {
    const server = store.getState().server.value;
    let data = await server.destroyVillage(village.id);
    if (data) {
        village.scene.store.loadToStore({ money: data.money-0 },'gamer');        
    }
}