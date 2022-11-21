import Phaser from "phaser";

export default function Physics(scene) {
    const physics = scene.physics;
    physics.world.bounds.width = scene.map.widthInPixels;
    physics.world.bounds.height = scene.map.heightInPixels;

    physics.add.collider(scene.unitsGroup, scene.unitGroup, (unit1, unit2) => {
        if (unit1.id != unit2.id) {
            unit1.moveTo(unit1.goX, unit1.goY);
            unit2.moveTo(unit2.goX, unit2.goY);
        }
    });

    physics.add.collider(scene.unitsGroup, scene.treesGroup, (u, tree) => {
        if (u) {
            u.moveTo(u.goX, u.goY);
        }
    })

    physics.add.collider(scene.unitsGroup, scene.castlesGroup, (u, castle) => {
        if (u) {
            u.moveTo(u.goX, u.goY);
        }
    });

    scene.physics.add.collider(scene.selectorUnits, scene.unitsGroup, (selector,unit)=> unit.select());
}