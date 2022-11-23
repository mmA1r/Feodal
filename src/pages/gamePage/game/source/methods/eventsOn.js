import Phaser from "phaser";

export default function EventsOn(scene) {
    const Scene = scene;

    //Выбор объекта ЛКМ
    Scene.input.on('gameobjectup', (pointer, gameObject) => {
        if (pointer.button === 0 && gameObject.type === 'entites') {
            gameObject.select();
        }
    });

    //Взаимодействие юнитов с объектом
    Scene.input.on('gameobjectdown', (pointer, gameObject) => {
        if (pointer.button === 2 && Scene.selectedUnits.getChildren()[0]) {
            if (scene.castlesGroup.contains(gameObject)) {
                if (gameObject.id = scene.player) {
                    scene.selectedUnits.getChildren().forEach((unit)=>unit.returnToCastle());
                }
            }
        }
    })

    //Передвижение юнитов по клику
    scene.input.on('pointerdown', (pointer, gameObject) => {
        if (pointer.button === 2) {
            Scene.selectedUnits.getChildren().forEach(el => {
                el.moveTo(pointer.worldX, pointer.worldY)
            }
            );
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
            console.log(Scene.selectedObject.id, gameObject);
            Scene.selectedObject.unSelect();
        }

        if (pointer.button === 0 && !scene.CTRL && Scene.selectedObject && Scene.selectedObject.id != gameObject.id) {
            console.log(Scene.selectedObject.id, gameObject);
            Scene.selectedObject.unSelect();
        }
    })

    //Зажатие клавиши CTRL
    Scene.input.keyboard.on('keydown-CTRL', () => Scene.CTRL = true);
    Scene.input.keyboard.on('keyup-CTRL', () => Scene.CTRL = false);

}