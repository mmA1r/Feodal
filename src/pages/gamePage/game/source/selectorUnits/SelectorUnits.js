import Phaser from "phaser";

export default function SelectorUnits(scene) {
    scene.selectorUnits = scene.add.rectangle(100, 100, 0, 0, 232323, 0.5);
    scene.selectorUnits.setActive(true);
    scene.selectorUnits.depth = 100000000;


    //Начало области выделения юнитов
    scene.input.on('pointerdown', (pointer, gameObject) => {
        if (pointer.button === 0) {
            scene.selectorUnits.addedToScene();
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
            scene.unitsGroup.getChildren().forEach((unit)=>{
                const x1 = scene.selectorUnits.x;
                const x2 = scene.selectorUnits.x+scene.selectorUnits.width;
                const y1 = scene.selectorUnits.y;
                const y2 = scene.selectorUnits.y+scene.selectorUnits.height;
                let left = (x1 <= x2) ? x1 : x2;
                let right = (x1 >= x2) ? x1 : x2;
                let top = (y1 <= y2) ? y1 : y2;
                let bottom = (y1 >= y2) ? y1 : y2;
                if (unit.x > left &&
                    unit.x < right &&
                    unit.y < bottom &&
                    unit.y > top &&
                    unit.status !== "inCastle") {
                        unit.select();
                    }
            })
        scene.selectorUnits.height = 0;
        scene.selectorUnits.width = 0;
        setTimeout(() => {
            scene.selectorUnits.removedFromScene();
        }, 100);
    });

}