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
            if (scene.player.selectedObject.is) scene.player.command({
                x: pointer.worldX,
                y: pointer.worldY,
                type: 'pointer',
                visible: true
            })
        }
    });

    scene.input.on('gameobjectdown', (pointer, gameObject) => {
        if (pointer.button === 0)
            (gameObject.type != "navigate") ? scene.player.select(gameObject) : gameObject.toTarget();
        if (pointer.button === 2 && scene.player.selectedObject) {
            if (scene.player.selectedObject.is) scene.player.command(gameObject)
        }
    });

    scene.input.on('pointermove', (pointer) => {
        if (pointer.isDown && pointer.button === 0 && selector.active) selector.resizeTo(pointer.worldX, pointer.worldY);
    });

    scene.input.on('pointerup', (pointer) => {
        if (pointer.button === 0 && selector.active)
            selector.selectUnits()
    });

    scene.input.on('gameobjectover', (pointer, gameObject) => {
        if (!pointer.isDown) gameObject.inFocus();
    });

    scene.input.on('gameobjectout', (pointer, gameObject) => {
        if (!gameObject.selected) gameObject.outFocus();
    });
}