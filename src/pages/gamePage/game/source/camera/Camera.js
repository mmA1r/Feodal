import Phaser from "phaser";

export default function Camera(scene) {
    const Scene = scene;
    const camera = Scene.cameras.main;
    camera.scrollSpeed = 20;
    
    //Начальная настройка камеры
    camera.setBounds(0, 0, Scene.map.widthInPixels, Scene.map.heightInPixels);
    camera.move = function () {
            let x = camera.dX*camera.scrollSpeed+camera.midPoint.x;
            let y = camera.dY*camera.scrollSpeed+camera.midPoint.y
            camera.centerOn(x,y);
    };

    //Зум камеры
    Scene.input.on('wheel', (event) => {
            let zoom = camera.zoom;
            if (event.deltaY > 0 && zoom > 0.5) camera.setZoom(zoom * 0.9);
            if (event.deltaY < 0 && zoom < 5) camera.setZoom(zoom * 1.1);
    });

    Scene.input.on('pointermove',(pointer) =>{
        camera.isMoved = false;
        if(pointer.x<camera.width*0.1 || pointer.x>camera.width*0.9 ||pointer.y<camera.height*0.2||pointer.y>camera.height*0.80){
            let vector = camera.getScroll(pointer.x, pointer.y);
            let coef = camera.width/camera.height;
            const dist = Phaser.Math.Distance.Between(pointer.x/coef,pointer.y,camera.centerX/coef,camera.centerY);
            let dx = (pointer.x/coef - camera.centerX/coef)/dist;
            let dy = (pointer.y - camera.centerY)/dist;
            camera.dX = dx;
            camera.dY = dy;
            camera.isMoved = true;
        }
    })

    window.addEventListener('mousemove', (event)=>{

    })

    Scene.input.on('gameout',()=>{
        camera.isMoved = false;
    });

    //Движение камеры по карте с помощью CTRL

    Scene.input.on('pointermove', (pointer) => {
        if (pointer.isDown && pointer.button === 0 && Scene.CTRL) {
            camera.centerOn(camera.midPoint.x - pointer.event.movementX / camera.zoom, camera.midPoint.y - pointer.event.movementY / camera.zoom);
        }
    });



}