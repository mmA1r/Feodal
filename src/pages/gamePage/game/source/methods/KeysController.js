export default function KeysController(scene){
    scene.navigatorLines = scene.add.group();
    const navigatorOn = function () {
        scene.navigatorLines.getChildren().forEach( line => {
                if (line.target.body.enable){
                    line.setTo(scene.cameras.main.midPoint.x, scene.cameras.main.midPoint.y, line.target.x+50, line.target.y);
                    line.setVisible(true);
                }
        })
    }

    const navigatorOff = function () {
        scene.navigatorLines.getChildren().forEach( line => line.setVisible(false))
    }

    scene.input.keyboard.on('keydown-CTRL', navigatorOn);
    scene.input.keyboard.on('keyup-CTRL', navigatorOff);
}