import { Scene, Mesh, MeshBuilder, PhysicsAggregate, PhysicsShapeType, DistanceConstraint } from "@babylonjs/core";

export class Pendulum {
    private scene: Scene;
    private sphere: Mesh;
    private box: Mesh;
    private rod: Mesh;

    constructor(scene: Scene, xPos: number, physicsPlugin: any) {
        this.scene = scene;
        this.createPendulum(xPos, physicsPlugin);
    }

    private createPendulum(xPos: number, physicsPlugin: any): void {
        this.box = MeshBuilder.CreateBox("distanceBox", { height: 0.5, width: 0.5, depth: 8 }, this.scene);
        this.box.position.set(xPos, 1, 0);

        this.sphere = MeshBuilder.CreateCylinder("distanceSphere", { height: 1, diameter: 1 }, this.scene);
        this.sphere.position.set(xPos, 1, -2);

        this.rod = MeshBuilder.CreateCylinder("pendulumRod", { height: 3, diameter: 0.1, tessellation: 32 }, this.scene);
        this.rod.position.set(xPos, 2, -1);

        let aggSphere = new PhysicsAggregate(this.sphere, PhysicsShapeType.CYLINDER, { mass: 1, restitution: 0.9 }, this.scene);
        let aggBox = new PhysicsAggregate(this.box, PhysicsShapeType.BOX, { mass: 0, restitution: 0.9 }, this.scene);

        let distanceJoint = new DistanceConstraint(3, this.scene);
        aggSphere.body.addConstraint(aggBox.body, distanceJoint);
    }
}
