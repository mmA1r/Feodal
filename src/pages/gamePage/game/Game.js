import React, { useEffect } from "react";
import Phaser from "phaser";
import { useSelector } from "react-redux";

import WorldScene from "./scenes/WorldScene";

export default function Game() {
    // eslint-disable-next-line 
    const server = useSelector((state) => state.server.value);

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
                WorldScene
            ]
        };
        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true, false);
        }
    }, []);


    return(
        <div id="game"/>
    );
}



