import Phaser from "phaser";

export default function EventsOn(scene) {
    const Scene = scene;

    //Выбор объекта ЛКМ
    Scene.input.on('gameobjectdown', (pointer, gameObject) => {
        if (pointer.button === 0 && gameObject.type === 'entites') {
            gameObject.select();
        }
    });

    //Начало области выделения юнитов
    Scene.input.on('pointerdown', (pointer, gameObject) => {
        if (pointer.isDown && pointer.button === 0) {
            Scene.selectorUnits.x = pointer.worldX;
            Scene.selectorUnits.y = pointer.worldY;
        }
    });

    //Увеличение области выделения юнитов
    Scene.input.on('pointermove', (pointer) => {
        if (pointer.isDown && pointer.button === 0 && !Scene.CTRL) {
            Scene.selectorUnits.width+=(pointer.worldX-Scene.selectorUnits.width-Scene.selectorUnits.x);
            Scene.selectorUnits.height+=(pointer.worldY-Scene.selectorUnits.height-Scene.selectorUnits.y); 
        }
    });

    //Конец области выделения юнитов
    Scene.input.on('pointerup', (pointer, gameObject) => {
        Scene.selectorUnits.body.setSize(Math.abs(Scene.selectorUnits.width),Math.abs(Scene.selectorUnits.height),Scene.selectorUnits.getCenter())
        Scene.selectorUnits.height = 0;
        Scene.selectorUnits.width = 0;
        setTimeout(() => {
            Scene.selectorUnits.body.setSize(Math.abs(Scene.selectorUnits.width),Math.abs(Scene.selectorUnits.height),Scene.selectorUnits.getCenter())
        },100);
    });

    //Передвижение юнитов по клику
    scene.input.on('pointerdown', (pointer, gameObject) => {
        if (!gameObject[0]) {
            if (pointer.button === 1) {
                Scene.selectedUnits.getChildren().forEach(el => {
                    el.moveTo(pointer.worldX, pointer.worldY)
                }
                );
            }
        }
    })

    //Сброс выбора юнитов
    scene.input.on('pointerdown', (pointer, gameObject) => {
        if (pointer.button === 0 && !scene.CTRL) {
            let unit = Scene.selectedUnits.getChildren()[0];
            while (unit) {
                unit.unSelect();
                unit = Scene.selectedUnits.getChildren()[0];
            }
        }
    })

    //Движение камеры по карте с помощью CTRL
    Scene.input.on('pointermove', (pointer) => {
        if (pointer.isDown && pointer.button === 0 && Scene.CTRL) {
            camera.centerOn(camera.midPoint.x - pointer.event.movementX / camera.zoom, camera.midPoint.y - pointer.event.movementY / camera.zoom);
        }
    });

    //Зажатие клавиши CTRL
    Scene.input.keyboard.on('keydown-CTRL', ()=>Scene.CTRL = true);
    Scene.input.keyboard.on('keyup-CTRL', ()=>Scene.CTRL = false);

    //Движение камеры при наведении на края камеры
    const camera = Scene.cameras.main;
    Scene.input.on('pointermove', (pointer) => {
            camera.moveX = false;
            camera.moveY = false;
            camera.state = 'free';
            if (pointer.worldX - camera.worldView.left < camera.moveXArea) {
                camera.moveX = true;
                camera.scrollXValue = (pointer.worldX - camera.worldView.left - camera.moveXArea) / 2;
                camera.state = 'scrolling';
            }
            if (camera.worldView.right - pointer.worldX < camera.moveXArea) {
                camera.moveX = true;
                camera.scrollXValue = -(camera.worldView.right - pointer.worldX - camera.moveXArea) / 2;
                camera.state = 'scrolling';
            }
            if (pointer.worldY - camera.worldView.top < camera.moveYArea) {
                camera.moveY = true;
                camera.scrollYValue = (pointer.worldY - camera.worldView.top - camera.moveYArea) / 2;
                camera.state = 'scrolling';
            }
            if (camera.worldView.bottom - pointer.worldY < camera.moveYArea) {
                camera.moveY = true;
                camera.scrollYValue = -(camera.worldView.bottom - pointer.worldY - camera.moveYArea) / 2;
                camera.state = 'scrolling';
            }
        });

}