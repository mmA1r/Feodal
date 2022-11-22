import Phaser from "phaser";

import store from '../../../../store/store';

import { ui } from "../../../../store/features/storeInterface/userInterface";

import EventsOn from '../source/methods/eventsOn'
import uploadSources from '../source/methods/uploadSource'
import Camera from '../source/camera/Camera'
import getScene from '../source/getScene/getScene'
import getCastle from '../source/getCastle/getCastle'

import { defaultEqualityCheck } from "reselect";
import { upload } from "@testing-library/user-event/dist/upload";
import StoreLoader from "../../../../store/StoreLoader";


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
    }

    async create() {
        /***************/
        /***** Map *****/
        /***************/
        this.map = this.make.tilemap({ key: 'tilemap' });
        const map = this.map;
        EventsOn(this);
        Camera(this);
        getScene(this);
        //getCastle(this, myCastle);
        let myCastle = this.add.group();
        const tiles = map.addTilesetImage('spriteTileSet', 'spriteMap');
        const grass = map.createLayer('grass', tiles, 0, 0);
        const bushes = map.createLayer('bushes', tiles, 0, 0);
        const trees = map.createLayer('trees', tiles, 0, 0);

        const physics = this.physics;
        physics.world.bounds.width = map.widthInPixels;
        physics.world.bounds.height = map.heightInPixels;
        this.treesGroup = this.add.group();
        let who = this.map.createFromTiles([201, 207], 201);
        who.forEach((el) => {
            el.x += 64;
            el.y -= 32;
            el.depth = el.y;
            el.setTexture('tree1');
            this.treesGroup.add(el);
            this.physics.add.existing(el, true);
            el.body.isCircle = true;
            el.body.setCircle(20);
            el.body.setOffset(32, 90)
        })
        who = this.map.createFromTiles([153], 153);
        who.forEach((el) => {
            el.x += 64;
            el.depth = el.y + 16;
            el.setTexture('tree2');
            this.treesGroup.add(el);
            this.physics.add.existing(el, true);
            el.body.isCircle = true;
            el.body.setCircle(15);
            el.body.setOffset(32, 46)
        })
        who = this.map.createFromTiles([155], 155);
        who.forEach((el) => {
            el.x += 64;
            el.y += 8;
            el.depth = el.y + 16;
            el.setTexture('tree3');
            this.treesGroup.add(el);
            this.physics.add.existing(el, true);
            el.body.isCircle = true;
            el.body.setCircle(15);
            el.body.setOffset(32, 48)
        })
        who = this.map.createFromTiles([209], 209);
        who.forEach((el) => {
            el.x += 64;
            el.y += -32;
            el.depth = el.y + 16;
            el.setTexture('tree4');
            this.treesGroup.add(el);
            this.physics.add.existing(el, true);
            el.body.isCircle = true;
            el.body.setCircle(15);
            el.body.setOffset(32, 92)
        })
        who = this.map.createFromTiles([211], 211);
        who.forEach((el) => {
            el.x += 64;
            el.y += -32;
            el.depth = el.y;
            el.setTexture('tree5');
            this.treesGroup.add(el);
            this.physics.add.existing(el, true);
            el.body.isCircle = true;
            el.body.setCircle(15);
            el.body.setOffset(32, 76)
        })
        this.physics.add.collider(this.unitsGroup, this.unitGroup, (unit1, unit2) => {
            if (unit1.id != unit2.id) {
                unit1.moveTo(unit1.goX, unit1.goY);
                unit2.moveTo(unit2.goX, unit2.goY);
            }
        });
        this.physics.add.collider(this.unitsGroup, this.treesGroup, (u, tree) => {
            if (u) {
                u.moveTo(u.goX, u.goY);
            }
        })
        /*unitsData?.forEach(unit => {
            if(unit.ownerId === castleData.id && unit.status === 'inCastle') {
                castleHp += unit.hp-0
                return castleUntits.push(unit);
            }
        });
        castle.setData({
            hp: castleHp,
            money: castleData.money-0,
            level: castleData.level-0,
            units: castleUntits,
            id: castleData.id
        });*/

        /**** Записываем данные в store ***/
        /*store.dispatch(money(castle.data.list.money));
        store.dispatch(level(castle.data.list.level));
        store.dispatch(units(castle.data.list.units));
        store.dispatch(hp(castle.data.list.hp));*/
        this.selectorUnits = this.add.rectangle(100,100,0,0,232323,0.5);//this.add.sprite(20,100,'soldier');
        
        this.selectorUnits.addedToScene();
        this.selectorUnits.setActive(true);
        this.selectorUnits.addToDisplayList();
        this.selectorUnits.depth=100000000;
        this.physics.add.existing(this.selectorUnits);
        // console.log(this.selectorUnits);
        this.physics.add.collider(this.selectorUnits, this.unitsGroup, (selector,unit)=> unit.select());
        this.selectorUnits.body.onCollide = true;
    }


    async update() {
        this.unitsGroup.getChildren().forEach((el) => el.update());
        if (this.cameras.main.moveX || this.cameras.main.moveY) {
            this.cameras.main.move();
        }
    }
}