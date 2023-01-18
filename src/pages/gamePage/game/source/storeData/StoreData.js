import store from '../../../../../store/store';

export default class StoreData {
    constructor(scene) {
        this.scene = scene;
        this.lasUI = 'hide';
        this.scene.store.loadToStore(this.changeDataStore.bind(this),'changeStore');
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
                if (ui === 'castle') {
                    this.scene.cameras.main.centerOn(myCastle.x, myCastle.y);
                    this.scene.cameras.main.viewScreenUpdate();
                    myCastle.select();
                }
                this.lasUI = ui;
            }
        }
    }

}