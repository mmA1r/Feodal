import Phaser from "phaser";
import EventsOn from '../source/methods/EventsOn'
import uploadSources from '../source/methods/uploadSource'
import Camera from '../source/camera/Camera'
import getScene from '../source/getScene/getScene'
import AutoUpdater from "../source/autoUpdater/autoUpdater";
import Physics from "../source/physics/Physics";
import Trees from "../source/trees/Trees";
import SelectorUnits from "../source/selectorUnits/SelectorUnits";
import StoreLoader from "../../../../store/StoreLoader";
import StoreData from "../source/storeData/StoreData";
import Player from "../source/player/Player";
import updateUnits from "../source/updateUnits/updateUnits";


export default class WorldScene extends Phaser.Scene {
    constructor(name) {
        super(name);
    }

    preload() {
        uploadSources(this);
        this.unitsGroup = this.add.group();
        this.castlesGroup = this.add.group();
        this.villagesGroup = this.add.group();
        this.selectedUnits = this.add.group();
        this.treesGroup = this.add.group();
        this.unitsInCastleGroup = this.add.group();
    }

    async create() {
        this.map = this.make.tilemap({ key: 'tilemap' });
        const map = this.map;
        const tiles = map.addTilesetImage('spriteTileSet', 'spriteMap');
        this.grass = map.createLayer('grass', tiles, 0, 0);
        this.bushes = map.createLayer('bushes', tiles, 0, 0);
        this.trees = map.createLayer('trees', tiles, 0, 0);
        this.store = new StoreLoader;
        Player(this);
        SelectorUnits(this);
        EventsOn(this);
        Camera(this);
        Trees(this);
        Physics(this);
        this.updateUnits = updateUnits(this);
        this.getScene = getScene(this);
        this.StoreData = StoreData(this);
    }


    async update() {
        this.unitsGroup.getChildren().forEach((el) => {
            el.update();
        });
        if (this.cameras.main.isMoved) {
            this.cameras.main.move();
        }
    }
}