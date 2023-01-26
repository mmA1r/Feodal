export default function KeysController(scene){
    scene.navigatorLines = scene.add.group();
    const navigatorOn = function () {
        console.log('CTRL');
        scene.navigatorLines.getChildren().forEach( line => {
            //line.setTo(0,0,500,500)
            line.setTo(scene.cameras.main.midPoint.x+200, scene.cameras.main.midPoint.y+280, line.target.x+200, line.target.y+280);
            line.setVisible(true);
            console.log(line);
        })
    }

    const navigatorOff = function () {
        console.log('CTRL');
        scene.navigatorLines.getChildren().forEach( line => line.setVisible(false))
    }

    scene.input.keyboard.on('keydown-CTRL', navigatorOn);
    scene.input.keyboard.on('keyup-CTRL', navigatorOff);
}