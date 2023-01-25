import store from '../../../../../store/store';

export default class StoreData {
    constructor(scene) {
        this.scene = scene;
        this.lastUI = 'hide';
        this.scene.store.loadToStore(this.changeDataStore.bind(this),'changeStore');
        this.scene.updater.add(this, new Date()- 0 + 500, 'loadDataUnitsTypes', true);
    }

    nameUI(ui) {
        if (ui.castle) return 'castle';
        if (ui.army) return 'army';
        if (ui.unit) return 'unit';
        if (ui.village) return 'village';
        if (ui.enemyCastle) return 'enemyCastle';
        if (ui.enemyArmy) return 'enemyArmy';
        if (ui.enemyUnit) return 'enemyUnit';
    }

    loadDataUnitsTypes(){
        const state = store.getState();
        this.scene.dataUnitsTypes = [{hp: 1}, state.soldier, state.assassin];
    }

    changeDataStore() {
        const myCastle = this.scene.castlesGroup.getChildren().find(el => el.isMine);
        if (myCastle) {
            const state = store.getState();
            let ui = this.nameUI(state.interface.value);
            if (ui === this.lastUI) {
                switch (ui) {
                    case 'castle': {
                        state.gamer.units.forEach((unit) => {
                            if (unit.status === "outOfCastle") {
                                let unitInGame = myCastle.units.getChildren().find(el => el.hp === unit.hp);
                                if (unitInGame) {
                                    unitInGame.outCastle();
                                }
                            }
                        });
                        break;
                    }
                    case 'unit': {
                        //выбор действия
                    }
                }
            }
            else {
                switch (ui) {
                    case 'castle': {
                        this.scene.cameras.main.centerOn(myCastle.x, myCastle.y);
                        this.scene.cameras.main.viewScreenUpdate();
                        this.scene.player.select(myCastle);
                        break;
                    }
                    case undefined:
                        {
                            this.scene.player.unselect();
                        }
                }
                this.lastUI = ui;
            }
        }
    }

}