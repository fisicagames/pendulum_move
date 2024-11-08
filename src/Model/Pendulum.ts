import { Scene, Mesh, MeshBuilder, PhysicsAggregate, PhysicsShapeType, 
        DistanceConstraint, StandardMaterial, Color3, 
        Quaternion,
        Vector3} from "@babylonjs/core";

export class Pendulum {
    private scene: Scene;
    private cylinder: Mesh;
    private box: Mesh;
    private boxL: Mesh;
    private boxR: Mesh;
    private rod: Mesh;
    defaultUp: Vector3;

    constructor(scene: Scene, xPos: number) {
        this.scene = scene;
        this.createPendulum(xPos);
    }

    private createPendulum(xPos: number): void {

        this.defaultUp = new Vector3(0,1,0);


        this.box = MeshBuilder.CreateBox("distanceBoxTop", { height: 0.5, width: 0.5, depth: 16 }, this.scene);
        this.box.position.set(xPos, 4.5, 0);
        this.boxL = MeshBuilder.CreateBox("distanceBoxL", { height: 8, width: 0.5, depth: 0.5 }, this.scene);
        this.boxL.position.set(xPos, 1, -8);
        this.boxR = MeshBuilder.CreateBox("distanceBoxR", { height: 8, width: 0.5, depth: 0.5 }, this.scene);
        this.boxR.position.set(xPos, 1, 8);

        this.cylinder = MeshBuilder.CreateCylinder("cylinderPendulumMass", { height: 1, diameter: 1, tessellation: 8 }, this.scene);
        this.cylinder.position.set(xPos, -5, -10);
        const material = new StandardMaterial(`cylinderPendulumMassMaterial`, this.scene);
        material.diffuseColor = new Color3(0.9, 0.1, 0.1);
        this.cylinder.material = material;

        this.rod = MeshBuilder.CreateCylinder("pendulumRod", { height: 7, diameter: 0.1, tessellation: 8 }, this.scene);
        this.rod.position.set(xPos, 2, -1);

        let aggCylinder = new PhysicsAggregate(this.cylinder, PhysicsShapeType.CYLINDER, { mass: 1, restitution: 0.9 }, this.scene);
        let aggBox = new PhysicsAggregate(this.box, PhysicsShapeType.BOX, { mass: 0, restitution: 0.9 }, this.scene);

        let distanceJoint = new DistanceConstraint(6.5, this.scene);
        aggCylinder.body.addConstraint(aggBox.body, distanceJoint);
    }

    public adjustPendulumRodAngle() {
        
        const direction = this.box.position.subtract(this.cylinder.position);
        direction.normalize();

        //compute the difference in the default orientation of the cylinder to the orientation of the direction
        const rot = Quaternion.FromUnitVectorsToRef(this.defaultUp, direction, new Quaternion());

        // apply to the cylinder
        this.rod.rotationQuaternion = rot;
        this.cylinder.rotationQuaternion = rot;

        // compute the midpoint between the ball and box
        const midp = this.box.position.add(this.cylinder.position).scale(0.5);

        this.rod.position = midp;


    }
}
