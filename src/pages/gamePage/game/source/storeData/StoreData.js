import store from '../../../../../store/store';

export default class StoreData {
    constructor(scene) {
        this.scene = scene;
        this.lasUI = 'hide';
        this.scene.store.loadToStore(this.changeDataStore,'changeStore');
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

/*let lastUI=false;
const StoreData = setInterval(()=>{
    let units = store.getState().gamer.units;
    let ui = store.getState().interface.value.castle;
    if (ui){
        if (ui!=lastUI){
            lastUI=true;
            let myCastle = scene.castlesGroup.getChildren().find(el => el.type === "myCastle");
            if (myCastle) {
            scene.cameras.main.centerOn(myCastle.x,myCastle.y);
            scene.cameras.main.viewScreenUpdate();
            myCastle.select();
            }
        }
    } else {
        lastUI = false;
    }
    units.forEach((unit) => {
        if(unit.status==="outOfCastle") {
            let castle = scene.castlesGroup.getChildren().find(el => el.id === scene.player);
            let unitInGame = castle.units.getChildren().find(el => el.hp === unit.hp);
            if (unitInGame) {
                unitInGame.outCastle();
            }
        }
    })
}, 100)

return StoreData;*/