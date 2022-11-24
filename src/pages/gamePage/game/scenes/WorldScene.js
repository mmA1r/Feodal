import Phaser from "phaser";

import EventsOn from '../source/methods/EventsOn'
import uploadSources from '../source/methods/uploadSource'
import Camera from '../source/camera/Camera'
import getScene from '../source/getScene/getScene'
import getCastle from '../source/getCastle/getCastle'

import { defaultEqualityCheck } from "reselect";
import { upload } from "@testing-library/user-event/dist/upload";
import AutoUpdater from "../source/autoUpdater/autoUpdater";
import Physics from "../source/physics/Physics";
import Trees from "../source/trees/Trees";
import SelectorUnits from "../source/selectorUnits/SelectorUnits";
import StoreLoader from "../../../../store/StoreLoader";
import StoreData from "../source/storeData/StoreData";


export default class WorldScene extends Phaser.Scene {
    constructor(name) {
        super(name);
    }

    preload() {
        this.store = new StoreLoader;
        uploadSources(this);
        getCastle(this);
        this.unitsGroup = this.add.group();
        this.castlesGroup = this.add.group();
        this.villagesGroup = this.add.group();
        this.selectedUnits = this.add.group();
        this.treesGroup = this.add.group();
        this.unitsInCastleGroup = this.add.group();
        this.unitsPointersGroup = this.add.group();
        this.selectorUnits = {};
    }

    async create() {
        this.map = this.make.tilemap({ key: 'tilemap' });
        const map = this.map;
        const tiles = map.addTilesetImage('spriteTileSet', 'spriteMap');
        const grass = map.createLayer('grass', tiles, 0, 0);
        const bushes = map.createLayer('bushes', tiles, 0, 0);
        const trees = map.createLayer('trees', tiles, 0, 0);
        SelectorUnits(this);
        EventsOn(this);
        Camera(this);
        Trees(this);
        Physics(this);
        getScene(this);
        StoreData(this);
    }


    async update() {
        this.unitsGroup.getChildren().forEach((el) => el.update());
        if (this.cameras.main.isMoved) {
            this.cameras.main.move();
        }
        this.unitsPointersGroup.getChildren().forEach((el) => el.update());
    }
}