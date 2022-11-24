import store from '../../../../../store/store';

export default class Store {
    constructor(){
    }

    _method1(){
    }

    _method2(){

    }

    save(store,data){
        if (store='interface') {
            store.dispatch(money(castle.data.list.money));
            store.dispatch(level(castle.data.list.level));
            store.dispatch(units(castle.data.list.units));
            store.dispatch(hp(castle.data.list.hp))
        }
        if (store='unit') {
            store.dispatch(money(castle.data.list.money));
            store.dispatch(level(castle.data.list.level));
            store.dispatch(units(castle.data.list.units));
            store.dispatch(hp(castle.data.list.hp))
        }
    }
}