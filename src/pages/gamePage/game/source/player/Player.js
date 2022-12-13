import getCastle from '../getCastle/getCastle'

export default function Player(scene){
    const data = getCastle(scene);
    scene.player = {
        id: data.id,
        color: data.color,
        units: scene.add.group(),
        castle: {},
        selectedObj: [],
        might: 0
    };

    scene.player.select = function(selector){
        scene.player.unselect();
        selector.forEach(el => el.select);
    };

    scene.player.unselect = function() {
        scene.player.selectedObj.forEach(el => el.unselect);
    }
}