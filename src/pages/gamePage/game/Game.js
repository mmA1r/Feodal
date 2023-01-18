import React, { useEffect } from "react";
import Phaser from "phaser";
import StoreLoader from "../../../store/StoreLoader";

import WorldScene from "./scenes/WorldScene";

export default function Game() {
    const store = new StoreLoader();

    useEffect(() => {
        let scene = new WorldScene;
        const config = {
            type: Phaser.CANVAS,
            width: '100%',
            height: '100%',
            parent: 'game',
            fps: {
                target: 60,
                forceSetTimeOut: true
            },
            render: {
                pixelArt: false,
                clearBeforeRender: false
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },
            scene: [
                scene
            ]
        };
        
        const game = new Phaser.Game(config);

        return () => {
            clearInterval(scene.getScene);
            clearInterval(scene.updateUnits);
            store.restore();
            game.destroy(true, false);
            console.log('logout')
        }
    }, []);

    return(
        <div id="game"/>
    );
}



