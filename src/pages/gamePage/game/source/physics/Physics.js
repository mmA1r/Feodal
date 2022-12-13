import Phaser from "phaser";

export default function Physics(scene) {
    const physics = scene.physics;
    physics.world.bounds.width = scene.map.widthInPixels;
    physics.world.bounds.height = scene.map.heightInPixels;

    physics.add.collider(scene.unitsGroup, scene.unitsGroup, (unit1, unit2) => {
        if (unit1 != unit2){}
    });

    /*physics.add.collider(scene.unitsGroup, scene.treesGroup, (u, tree) => {
        if (u) {
            //u.moveTo(u.target.x,u.target.y);
        }
    })*/

    physics.add.collider(scene.unitsGroup, scene.castlesGroup, (u, castle) => {
        if (u) {
            u._getDirection();
        }
    });

    physics.add.collider(scene.unitsGroup, scene.villagesGroup, (u, villages) => {
        if (u) {
            u._getDirection();
        }
    });
}