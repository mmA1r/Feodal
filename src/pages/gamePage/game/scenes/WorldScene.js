import Phaser from "phaser";

import store from '../../../../store/store';
import { money } from '../../../../store/features/user/userMoney';
import { level } from '../../../../store/features/user/userLevel';
import { units } from '../../../../store/features/user/userUnits';
import { hp } from '../../../../store/features/user/userHp';
 
import tileMapSheet from '../../../../assets/gameSprites/spriteMap.png';
import castleSprite from '../../../../assets/gameSprites/castle.png';
import villageSprite from '../../../../assets/gameSprites/village.png'
import soldierSprite from '../../../../assets/gameSprites/soldier.png'
import tileMap from "../tileMap/tileMap";


export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    preload() {
        this.load.image('spriteMap', tileMapSheet);
        this.load.image('castleFirstLevel', castleSprite);
        this.load.image('village', villageSprite);
        this.load.image('soldier', soldierSprite);
        try {
            this.load.tilemapTiledJSON('tilemap', tileMap);
        } catch (e) {
            console.log('something wrong', e);
        }
    }

    async create() {
        /***************/
        /***** Map *****/
        /***************/
        const map = this.make.tilemap({ key: 'tilemap' });
        const tiles = map.addTilesetImage('spriteTileSet', 'spriteMap');
        // eslint-disable-next-line
        const grass = map.createLayer('grass', tiles, 0, 0);
        // eslint-disable-next-line
        const bushes = map.createLayer('bushes', tiles, 0, 0);
        // eslint-disable-next-line
        const trees = map.createLayer('trees', tiles, 0, 0);
        const physics = this.physics;

        physics.world.bounds.width = map.widthInPixels;
        physics.world.bounds.height = map.heightInPixels;

        const server = store.getState().server.value;
        const preCastleData = await server.getCastle();
        const preSceneData = await server.getScene();
        let castleData;
        let unitsData;
        let villagesData;
        let castlesData;
        if(preCastleData) {
            castleData = preCastleData;
        }
        if(preSceneData) {
            unitsData = preSceneData.units;
            // eslint-disable-next-line
            villagesData = preSceneData.villages;
            // eslint-disable-next-line
            castlesData = preSceneData.castles;
        }

        // console.log(castleData);
        // console.log(unitsData);
        // console.log(villagesData);
        // console.log(castlesData);

        // /********************/
        // /****** Castle ******/
        // /********************/

        
        const castle = physics.add.image(castleData.posX-0, castleData.posY-0, 'castleFirstLevel');
        castle.setInteractive();
        const castleUntits = [];
        let castleHp = 0
        unitsData?.forEach(unit => {
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
        });

        /**** Записываем данные в store ***/
        store.dispatch(money(castle.data.list.money));
        store.dispatch(level(castle.data.list.level));
        store.dispatch(units(castle.data.list.units));
        store.dispatch(hp(castle.data.list.hp));
        
        castle.addListener('pointerover', () => {
            castle.setTint(185274);
        });
        castle.addListener('pointerout', () => {
            castle.setTint();
        });
        castle.addListener('pointerdown', () => {
            document.getElementsByClassName('castle-manage-button')[0].click();
        });

        /*********************/
        /****** Player ******/
        /*********************/

        this.soldier = this.add.sprite(2200, 2100, 'soldier');
        this.soldier.setInteractive();
        this.soldier.setActive();

        this.soldier.addListener('pointerdown', () => {
            this.soldier.setData({status: 'active'});
        });

        this.input.on('pointerdown', (e) => {
            // console.log(e)
            if(this.soldier.getData('status') === 'active') {
                // console.log(Math.abs(mouseVector.x))
                const move = setInterval(() => {
                    this.soldier.x += mouseVector.x/100;
                    this.soldier.y += mouseVector.y/100;
                    if(Math.abs(this.soldier.x) > Math.abs(e.worldX) && Math.abs(this.soldier.y) > Math.abs(e.worldY)) {
                        clearInterval(move);
                    }
                }, 30)
            }
            if(e.event.button === 2) {
                this.soldier.setData({status: 'inactive'});
            }
        });

        /*********************/
        /****** Village ******/
        /*********************/


        /******************/
        /***** Camera *****/
        /******************/ 
        const camera = this.cameras.main;

        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        camera.useBounds = true;
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setViewport(0, 0, winWidth, winHeight);
        camera.centerOn(castle.x, castle.y);

        /**** CameraMove  ****/

        // this.input.setPollOnMove()

        const pageCenter = { 
            x: winWidth/2, 
            y: winHeight/2 
        }
        const cameraMovesTo = {
            x: castle.x - winWidth/2,
            y: castle.y - winHeight/2,
            move: false
        }
        const mouseVector = {
            x: 0,
            y: 0
        }

        const moveCamera = setInterval(function() {
            if(cameraMovesTo.move) {
                if(
                    (Math.ceil(camera.worldView.right) >= camera._bounds.right && mouseVector.x > 0) ||
                    (Math.ceil(camera.worldView.left) <= camera._bounds.left && mouseVector.x < 0)
                ) {
                    cameraMovesTo.x += 0;
                } else {
                    cameraMovesTo.x += mouseVector.x/300;
                }
                if(
                    (Math.ceil(camera.worldView.bottom) >= camera._bounds.bottom && mouseVector.y > 0) ||
                    (Math.ceil(camera.worldView.top) <= camera._bounds.top && mouseVector.y < 0)
                ) {
                    cameraMovesTo.y += 0;
                } else {
                    cameraMovesTo.y += mouseVector.y/150;
                }
                camera.setScroll(cameraMovesTo.x, cameraMovesTo.y);
            }
            if(!document.getElementById('game')) {
                cameraMovesTo.move = false;
                clearInterval(moveCamera);
                this.scene.remove('WorldScene');
            }
        });

        this.input.on('pointermove', (e) => {
            isMoveCamera(e);
        });

        function isMoveCamera(e) {
            if (
                (
                    e.event.clientX >= winWidth - winWidth/5 || 
                    e.event.clientX < winWidth/5 || 
                    e.event.clientY >= winHeight - winHeight/5 || 
                    e.event.clientY < winHeight/5
                ) 
            ) {
                cameraMovesTo.move = true;
            } else {
                cameraMovesTo.move = false;
            }
            document.getElementsByTagName('canvas')[0].onmouseleave = () => {
                cameraMovesTo.move = false;
            };
            mouseVector.x = e.event.clientX - pageCenter.x;
            mouseVector.y = e.event.clientY - pageCenter.y;
        }

        /**** CameraZoom  ****/
        this.input.on('wheel', (e) => {
            zoom(e.deltaY);
        });

        let zoomDelta = 1;

        function zoom(delta) {
            if(delta > 0) { //вверх
                if(zoomDelta > 0.5) {
                    zoomDelta -= delta/1500;
                    camera.zoomTo(zoomDelta, 200, 'Linear', true);
                }
            } else { //вниз
                if(zoomDelta < 2) {
                    zoomDelta -= delta/1500;
                    camera.zoomTo(zoomDelta, 200, 'Linear', true);
                }
            }
        }
    }

    async update() {
        const server = store.getState().server.value;
        const preSceneData = await server.getScene();
        if(preSceneData) {
            const castle = await server.getCastle();

            const sceneUnits = preSceneData.units;
            // eslint-disable-next-line
            const villages = preSceneData.villages;
            // eslint-disable-next-line
            const castles = preSceneData.castles;

            const userUnits = [];
            let castleHp = 0;
            sceneUnits.forEach(unit => {
                if(unit.ownerId === castle.id) {
                    userUnits.push(unit);
                    castleHp += unit.hp-0;
                }
            });
            store.dispatch(money(castle.money));
            store.dispatch(level(castle.level));
            store.dispatch(units(userUnits));
            store.dispatch(hp(castleHp));
        }
    }
}