import Selector from "../player/selector/Selector";

export default function MouseController(scene) {
    const selector = new Selector(scene);

    scene.input.on('pointerdown', (pointer, gameObject) => {
        if (pointer.button === 0) {
            if (!gameObject[0]) {
                scene.player.unselect();
            }
            selector.beginPath(pointer.worldX, pointer.worldY);
        }
        if (pointer.button === 2 && !gameObject[0] && scene.player.selectedObject) {
            if (scene.player.selectedObject.isMine) scene.player.command({
                x: pointer.worldX,
                y: pointer.worldY,
                type: 'pointer'
            })
        }
    });

    scene.input.on('gameobjectdown', (pointer, gameObject) => {
        if (pointer.button === 0) scene.player.select(gameObject);
        if (pointer.button === 2 && scene.player.selectedObject) {
            if (scene.player.selectedObject.isMine) scene.player.command(gameObject)
        }
    });

    scene.input.on('pointermove', (pointer) => {
        if (pointer.isDown && pointer.button === 0 && selector.active) selector.resizeTo(pointer.worldX, pointer.worldY);
    });

    scene.input.on('pointerup', (pointer) => {
        if (pointer.button === 0 && selector.active)
            selector.selectUnits()
    });
}