import Phaser from "phaser";

import tileMapSheet from '../../../../assets/sprite.png';
import tileMap from "../tileMap/tileMap";

var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function WorldScene() {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },

    preload: function() {
        this.load.image('spriteMap', tileMapSheet);

        try {
            this.load.tilemapTiledJSON('tilemap', tileMap);
        } catch (e) {
            console.log('something wrong', e);
        }
    },

    create: function() {
        const map = this.make.tilemap({ key: 'tilemap' });
        const tiles = map.addTilesetImage('spriteTileSet', 'spriteMap');

        this.scale.setGameSize(map.widthInPixels, map.heightInPixels);
        this.cameras.main.setSize(map.widthInPixels, map.heightInPixels)

        const ground = map.createLayer('ground', tiles, 0, 0);
        const water = map.createLayer('water', tiles, 0, 0);
            water.setCollisionByExclusion([-1]);
        const forest = map.createLayer('forest', tiles, 0, 0);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;

        this.keys = this.input.keyboard.addKeys({
            a:  Phaser.Input.Keyboard.KeyCodes.A,
            s:  Phaser.Input.Keyboard.KeyCodes.S,
            d:  Phaser.Input.Keyboard.KeyCodes.D,
            w:  Phaser.Input.Keyboard.KeyCodes.W
        });
        this.cameraBounds = this.cameras.main.getBounds();
    },

    update: function() {
        const camera = this.cameras.main;
        this.keys = this.input.keyboard.addKeys({
            a:  Phaser.Input.Keyboard.KeyCodes.A,
            s:  Phaser.Input.Keyboard.KeyCodes.S,
            d:  Phaser.Input.Keyboard.KeyCodes.D,
            w:  Phaser.Input.Keyboard.KeyCodes.W
        });
        if(this.keys.a.isDown && camera.x < this.cameraBounds.left) {
            camera.x += 7;
        } else if(this.keys.d.isDown && camera.x - camera.scaleManager.parent.offsetParent.clientWidth > -camera.width) {
            camera.x -= 7;
        }
        if(this.keys.w.isDown && camera.y < this.cameraBounds.y) {
            camera.y += 7;
        } else if(this.keys.s.isDown && camera.y - camera.scaleManager.parent.offsetParent.clientHeight > -camera.height + 3) {
            camera.y -= 7;
        }
    }
});

export default WorldScene;