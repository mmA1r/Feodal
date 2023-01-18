import Phaser from "phaser";
import StatusBar from "./StatusBar";

export default class Entity extends Phaser.GameObjects.Sprite{
    constructor(scene, props) {
        super(scene);
        this.selected = false;
        this.type = props.type;
        this.callbackUI = this.scene.player.updateUI; //props.callbackUI;
        this.activeRadius = props.activeRadius;
        this.viewRadius = this.scene.add.arc;
        this.statusBar = new StatusBar(this);
    }

    _updateDataCallbackUI(){
        if (this.selected) this.callbackUI();
    }

    updateData(param, value){
        if (this[param] || this[param] === false) {
            this[param] = value;
            this._updateDataCallbackUI();
        }
    }

    select() {
        this.updateData('selected', true);
        this.statusBar.setVisible(true);
    }

    unselect() {
        this.updateData('selected', false);
        this.statusBar.setVisible(false);
        this.callbackUI();
    }

    destroy(){
        this.statusBar.destroy();
        super.destroy();
    }
}