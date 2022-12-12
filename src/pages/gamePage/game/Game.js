import React, { useEffect } from "react";
import Phaser from "phaser";
import StoreLoader from "../../../store/StoreLoader";

import WorldScene from "./scenes/WorldScene";

export default function Game() {
    const store = new StoreLoader();
    const scene = new WorldScene;

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: '100%',
            height: '100%',
            parent: 'game',
            fps: {
                target: 60,
                forceSetTimeOut: true
            },
            pixelArt: true,
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
            clearInterval(scene.StoreData);
            store.restore();
            game.destroy(true, false);
        }
    }, []);

    return(
        <div id="game"/>
    );
}



