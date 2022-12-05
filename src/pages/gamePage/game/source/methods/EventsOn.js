import Phaser from "phaser";


export default function EventsOn(scene) {
    const Scene = scene;

    //Выбор объекта ЛКМ
    Scene.input.on('gameobjectup', (pointer, gameObject) => {
        if (pointer.button === 0 && scene.selectorUnits.width===0 && scene.selectorUnits.height===0) {
            gameObject.select();
        }
    });

    Scene.input.on('gameobjectover', (pointer, gameObject) => {
            if (!pointer.isDown) gameObject.selector.setVisible(true);
    });

    Scene.input.on('gameobjectout', (pointer, gameObject) => {
        if (!gameObject.selected) gameObject.selector.setVisible(false);
});

    scene.input.on('gameobjectdown', (pointer, gameObject) => {
        if (pointer.button === 2 && Scene.selectedUnits.getChildren()[0]) {
            Scene.selectedUnits.getChildren().forEach(el => {
                if (el.isMine()) el.moveTo(gameObject);
            }
            );
        }
    });

    //Передвижение юнитов по клику
    scene.input.on('pointerdown', (pointer, gameObject) => {
        if (pointer.button === 2 && !gameObject[0]) {
                Scene.selectedUnits.getChildren().forEach(el => {
                    if (el.isMine()){
                        el.pointer.moveTo(pointer.worldX,pointer.worldY);
                        el.moveTo(el.pointer);
                    }
                });
                if (Scene.selectedObject && Scene.selectedObject.type === "myCastle")Scene.selectedObject.pointer.moveTo(pointer.worldX,pointer.worldY);
        }
        if (pointer.button === 0 && !gameObject[0]) {
            Scene.store.loadToStore('hide','ui');

        }

    //Сброс выбора юнитов
        if (pointer.button === 0 && !scene.CTRL) {
            let unit = Scene.selectedUnits.getChildren()[0];
            while (unit) {
                unit.unSelect();
                unit = Scene.selectedUnits.getChildren()[0];
            }
        }


        if (pointer.button === 0 && !scene.CTRL && Scene.selectedObject && !gameObject[0]) {
            Scene.selectedObject.unSelect();
        }

        if (pointer.button === 0 && !scene.CTRL && Scene.selectedObject && !gameObject.selected) {
            Scene.selectedObject.unSelect();
        }
    })

    //Зажатие клавиши CTRL
    Scene.input.keyboard.on('keydown-CTRL', () => Scene.CTRL = true);
    Scene.input.keyboard.on('keyup-CTRL', () => Scene.CTRL = false);

}
