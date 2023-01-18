export default  class GameStore {
    constructor(store){
        this.data = store;
        this.dirty = false;
    }
}