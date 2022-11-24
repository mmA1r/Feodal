import Phaser from "phaser";

export default function SelectorUnits(scene) {
    scene.selectorUnits = scene.add.rectangle(100, 100, 0, 0, 232323, 0.5);
    scene.selectorUnits.addedToScene();
    scene.selectorUnits.setActive(true);
    scene.selectorUnits.addToDisplayList();
    scene.selectorUnits.depth = 100000000;
    scene.physics.add.existing(scene.selectorUnits, false);
    scene.selectorUnits.body.onCollide = true;


    //Начало области выделения юнитов
    scene.input.on('pointerdown', (pointer, gameObject) => {
        if (pointer.isDown && pointer.button === 0) {
            scene.selectorUnits.x = pointer.worldX;
            scene.selectorUnits.y = pointer.worldY;
        }
    });

    //Увеличение области выделения юнитов
    scene.input.on('pointermove', (pointer) => {
        if (pointer.isDown && pointer.button === 0 && !scene.CTRL) {
            scene.selectorUnits.width += (pointer.worldX - scene.selectorUnits.width - scene.selectorUnits.x);
            scene.selectorUnits.height += (pointer.worldY - scene.selectorUnits.height - scene.selectorUnits.y);
        }
    });

    //Конец области выделения юнитов
    scene.input.on('pointerup', (pointer, gameObject) => {
        scene.selectorUnits.body.enable = true;
        scene.selectorUnits.body.setSize(Math.abs(scene.selectorUnits.width), Math.abs(scene.selectorUnits.height), scene.selectorUnits.getCenter())
        scene.selectorUnits.height = 0;
        scene.selectorUnits.width = 0;
        setTimeout(() => {
            scene.selectorUnits.body.enable = false;
            scene.selectorUnits.body.setSize(Math.abs(scene.selectorUnits.width), Math.abs(scene.selectorUnits.height), scene.selectorUnits.getCenter())
        }, 100);
    });
}