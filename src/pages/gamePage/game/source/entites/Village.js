import Phaser from "phaser";

export default class Village extends Phaser.GameObjects.Image {
    constructor(scene, serverData) {
        super(scene);
        this.x = Math.round(serverData.posX * 64);
        this.y = Math.round(serverData.posY * 64);;
        //this.depth = this.y;
        this.activeRadius = 30000;
        this.id = serverData.id;
        this.scene.villagesGroup.add(this);
        this.setTexture('village');
        this.rewriteData(serverData);
        this.addedToScene();
        this.addToDisplayList();
        this.setInteractive();
        this.selected = false;
        this.type = 'village';
        this.scene.physics.add.existing(this, true);
        this.body.isCircle = true;
        const name = this.scene.add.text(this.x, this.y+130,serverData.name, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        name.depth = 10000000;
        name.style.setFontSize(30);
        name.style.setAlign('center')
        name.scrollFactorX = 1;
        name.scrollFactorY = 1;
    }

    select() {
        let unit = this.scene.selectedUnits.getChildren()[0];
        while (unit) {
            unit.unSelect();
            unit = this.scene.selectedUnits.getChildren()[0];
        }
        this.setTint(4234);
        this.selected = true;
        this.scene.selectedObject = this;
        this.updateUI();
        this.scene.store.loadToStore('village', 'ui');
    }

    unSelect() {
        this.setTint();
        this.selected = false;
        this.scene.selectedObject = null;
        this.scene.store.loadToStore('hide', 'ui');
    }

    rewriteData(serverData) {
        this.level = serverData.level;
        this.population = serverData.population;
    }

    updateUI() {
        if (this.selected) {
            /*const array = this.units.getChildren().map((el) => {
                return {
                    type: el.unitType,
                    status: 'inCastle',
                    hp: el.hp
                }
            });
            this.scene.store.loadToStore({ units: array }, 'gamer');*/
        }
    }
}