import Phaser from "phaser";

export default function Trees(scene) {
    let who = scene.map.createFromTiles([201, 207], 201);
    who.forEach((el) => {
        el.x += 64;
        el.y -= 32;
        el.depth = el.y;
        el.setTexture('tree1');
        scene.treesGroup.add(el);
        scene.physics.add.existing(el, true);
        el.body.isCircle = true;
        el.body.setCircle(20);
        el.body.setOffset(32, 90)
    })
    who = scene.map.createFromTiles([153], 153);
    who.forEach((el) => {
        el.x += 64;
        el.depth = el.y + 16;
        el.setTexture('tree2');
        scene.treesGroup.add(el);
        scene.physics.add.existing(el, true);
        el.body.isCircle = true;
        el.body.setCircle(15);
        el.body.setOffset(32, 46)
    })
    who = scene.map.createFromTiles([155], 155);
    who.forEach((el) => {
        el.x += 64;
        el.y += 8;
        el.depth = el.y + 16;
        el.setTexture('tree3');
        scene.treesGroup.add(el);
        scene.physics.add.existing(el, true);
        el.body.isCircle = true;
        el.body.setCircle(15);
        el.body.setOffset(32, 48)
    })
    who = scene.map.createFromTiles([209], 209);
    who.forEach((el) => {
        el.x += 64;
        el.y += -32;
        el.depth = el.y + 16;
        el.setTexture('tree4');
        scene.treesGroup.add(el);
        scene.physics.add.existing(el, true);
        el.body.isCircle = true;
        el.body.setCircle(15);
        el.body.setOffset(32, 92)
    })
    who = scene.map.createFromTiles([211], 211);
    who.forEach((el) => {
        el.x += 64;
        el.y += -32;
        el.depth = el.y;
        el.setTexture('tree5');
        scene.treesGroup.add(el);
        scene.physics.add.existing(el, true);
        el.body.isCircle = true;
        el.body.setCircle(15);
        el.body.setOffset(32, 76)
    })
}