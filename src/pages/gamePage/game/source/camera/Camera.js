import Phaser from "phaser";

export default function Camera(scene) {
    const Scene = scene;
    const camera = Scene.cameras.main;

    //Начальная настройка камеры
    camera.setBounds(0, 0, Scene.map.widthInPixels, Scene.map.heightInPixels);
    camera.moveXArea = camera.worldView.width / 15;
    camera.moveYArea = camera.worldView.height / 10;
    camera.move = function () {
        if (camera.moveX) {
            camera.scrollX += camera.scrollXValue;
        };
        if (camera.moveY) {
            camera.scrollY += camera.scrollYValue;
        };
    };

    //Зум камеры
    Scene.input.on('wheel', (event) => {
        if (camera.state==="free"){
            let zoom = camera.zoom;
            if (event.deltaY > 0 && zoom > 0.5) camera.setZoom(zoom * 0.9);
            if (event.deltaY < 0 && zoom < 5) camera.setZoom(zoom * 1.1);
        }
    });

    //Масштабирование области у краев карты
    Scene.input.on('wheel', (event) => {
        if (camera.state==="free"){
            camera.moveXArea = 0.1 * camera.worldView.width
            camera.moveYArea = 0.15 * camera.worldView.height
        }
    });



}