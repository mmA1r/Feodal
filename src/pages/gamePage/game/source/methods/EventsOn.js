export default function EventsOn(scene) {
    const Scene = scene;

    //Выбор объекта ЛКМ
    /*Scene.input.on('gameobjectup', (pointer, gameObject) => {
        if (pointer.button === 0) {
            gameObject.select();
        }
    });*/



    //Передвижение юнитов по клику
    scene.input.on('pointerdown', (pointer, gameObject) => {
        
        /*if (pointer.button === 0 && !gameObject[0]) {
            Scene.store.loadToStore('hide','ui');

        }*/

    //Сброс выбора юнитов
        /*if (pointer.button === 0 && !scene.CTRL) {
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
        }*/
    })

    //Зажатие клавиши CTRL
    Scene.input.keyboard.on('keydown-CTRL', () => Scene.CTRL = true);
    Scene.input.keyboard.on('keyup-CTRL', () => Scene.CTRL = false);

}
