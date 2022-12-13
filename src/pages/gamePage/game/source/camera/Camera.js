import Phaser from "phaser";

export default function Camera(scene) {
    const Scene = scene;
    const camera = Scene.cameras.main;
    camera.scrollSpeed = 20;
    let viewTiles = [];
    camera.viewScreenUpdate = function(){
        let cameraWidth = (scene.cameras.main.width*1.5)/camera.zoom;
        let cameraHeight = (scene.cameras.main.height*1.5)/camera.zoom;
        let cameraX = scene.cameras.main.midPoint.x-cameraWidth/2;
        let cameraY = scene.cameras.main.midPoint.y-cameraHeight/2;
        viewTiles.forEach((tile)=>
        tile.setVisible(false));
        viewTiles = [];
        scene.grass.getTilesWithinWorldXY(cameraX,cameraY, cameraWidth,cameraHeight).forEach((tile) => {
                tile.setVisible(true);
                viewTiles.push(tile);
        })
        scene.bushes.getTilesWithinWorldXY(cameraX,cameraY, cameraWidth,cameraHeight).forEach((tile) => {
            tile.setVisible(true);
            viewTiles.push(tile);
        })
        /*scene.trees.getTilesWithinWorldXY(cameraX,cameraY, cameraWidth,cameraHeight).forEach((tile) => {
            tile.setVisible(true);
            viewTiles.push(tile);
        })*/
        scene.treesGroup.getChildren().forEach((tree) => {
            if (tree.x < scene.cameras.main.midPoint.x-scene.cameras.main.width/camera.zoom   
                || tree.x > scene.cameras.main.midPoint.x+scene.cameras.main.width/camera.zoom  
                || tree.y < scene.cameras.main.midPoint.y-scene.cameras.main.height/camera.zoom  
                || tree.y > scene.cameras.main.midPoint.y+scene.cameras.main.height/camera.zoom ) {
                    tree.setVisible(false);
            } else {
                tree.setVisible(true);
            }
        })
    }
    //Начальная настройка камеры
    camera.viewScreenUpdate();
    camera.setBounds(0, 0, Scene.map.widthInPixels, Scene.map.heightInPixels);

    camera.move = function () {
            let x = camera.dX*camera.scrollSpeed+camera.midPoint.x;
            let y = camera.dY*camera.scrollSpeed+camera.midPoint.y
            camera.centerOn(x,y);
            camera.viewScreenUpdate();
    };

    //Зум камеры
    Scene.input.on('wheel', (event) => {
            let zoom = camera.zoom;
            if (event.deltaY > 0 && zoom > 0.65) camera.setZoom(zoom * 0.9);
            if (event.deltaY < 0 && zoom < 3) camera.setZoom(zoom * 1.1);
            camera.viewScreenUpdate();
            camera.scrollSpeed = 20/camera.zoom;
    });

    window.addEventListener('mousemove',(pointer) =>{
        camera.isMoved = false;
        if(pointer.clientX<15 || pointer.clientX>camera.width-15 ||pointer.clientY<15||pointer.clientY>camera.height-15){
            let coef = camera.width/camera.height;
            const dist = Phaser.Math.Distance.Between(pointer.clientX/coef,pointer.clientY,camera.centerX/coef,camera.centerY);
            let dx = (pointer.clientX/coef - camera.centerX/coef)/dist;
            let dy = (pointer.clientY - camera.centerY)/dist;
            camera.dX = dx;
            camera.dY = dy;
            camera.isMoved = true;
        }
    })

    Scene.input.on('gameout',()=>{
        camera.isMoved = false;
    });

    //Движение камеры по карте с помощью CTRL

    Scene.input.on('pointermove', (pointer) => {
        if (pointer.isDown && pointer.button === 0 && Scene.CTRL) {
            camera.centerOn(camera.midPoint.x - pointer.event.movementX / camera.zoom, camera.midPoint.y - pointer.event.movementY / camera.zoom);
            camera.viewScreenUpdate();
        }
    });



}