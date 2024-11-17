import {
    Scene, Mesh, MeshBuilder, PhysicsAggregate, PhysicsShapeType,
    DistanceConstraint, StandardMaterial, Color3,
    Quaternion,
    Vector3,
    TransformNode
} from "@babylonjs/core";

export class Pendulum {
    private scene: Scene;
    private cylinder: Mesh;
    private box: Mesh;
    private boxL: Mesh;
    private boxR: Mesh;
    private rod: Mesh;
    private defaultUp: Vector3;
    private physicsAggCylinder: PhysicsAggregate;
    private physicsAggBox: PhysicsAggregate;
    private physicsDistanceJoint: DistanceConstraint;
    public xPosition: number;
    public hasPlayerScored: boolean = false;

    constructor(scene: Scene, xPos: number, pendulumsNode: TransformNode, material: StandardMaterial) {
        this.scene = scene;
        this.xPosition = xPos;
        this.createPendulum(xPos, pendulumsNode, material);
    }

    private createPendulum(xPos: number, pendulumsNode, material): void {

        this.defaultUp = new Vector3(0, 1, 0);

        this.box = MeshBuilder.CreateBox(`PendulumBoxTop${xPos}`, { height: 0.5, width: 0.5, depth: 16 }, this.scene);
        this.box.position.set(xPos, 4.5, 0);
        this.box.parent = pendulumsNode;
        this.boxL = MeshBuilder.CreateBox(`PendulumBoxL${xPos}`, { height: 8, width: 0.5, depth: 0.5 }, this.scene);
        this.boxL.position.set(xPos, 1, -8);
        this.boxL.parent = pendulumsNode;
        this.boxR = MeshBuilder.CreateBox(`PendulumBoxR${xPos}`, { height: 8, width: 0.5, depth: 0.5 }, this.scene);
        this.boxR.position.set(xPos, 1, 8);
        this.boxR.parent = pendulumsNode;

        this.cylinder = MeshBuilder.CreateCylinder(`cylinderPendulumMass${xPos}`, { height: 1, diameter: 1, tessellation: 8 }, this.scene);
        this.cylinder.position.set(xPos, -5, Math.random() > 0.5 ? 8 : -8);
        this.cylinder.parent = pendulumsNode;
        this.cylinder.material = material;

        this.rod = MeshBuilder.CreateCylinder(`pendulumRod${xPos}`, { height: 7, diameter: 0.1, tessellation: 8 }, this.scene);
        this.rod.position.set(xPos, 2, -1);
        this.rod.parent = pendulumsNode;


        this.physicsAggCylinder = new PhysicsAggregate(this.cylinder, PhysicsShapeType.CYLINDER, { mass: 1, restitution: 0.9 }, this.scene);
        this.physicsAggBox = new PhysicsAggregate(this.box, PhysicsShapeType.BOX, { mass: 0, restitution: 0.9 }, this.scene);

        this.physicsDistanceJoint = new DistanceConstraint(6.5, this.scene);
        this.physicsAggCylinder.body.addConstraint(this.physicsAggBox.body, this.physicsDistanceJoint);
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
        const midPoint = this.box.position.add(this.cylinder.position).scale(0.5);

        this.rod.position = midPoint;

    }
    public dispose(): void {
        if (this.box) {
            this.box.dispose();
            this.box = null;
        }
        if (this.boxL) {
            this.boxL.dispose();
            this.boxL = null;
        }
        if (this.boxR) {
            this.boxR.dispose();
            this.boxR = null;
        }
        if (this.cylinder) {
            this.cylinder.dispose();
            this.cylinder = null;
        }
        if (this.rod) {
            this.rod.dispose();
            this.rod = null;
        }
    
        if (this.physicsAggCylinder) {
            if (this.physicsAggCylinder.transformNode) {
                this.physicsAggCylinder.transformNode.dispose();
            }
            this.physicsAggCylinder.shape.dispose();
            this.physicsAggCylinder.dispose();
            this.physicsAggCylinder = null;
        }
    
        if (this.physicsAggBox) {
            if (this.physicsAggBox.transformNode) {
                this.physicsAggBox.transformNode.dispose();
            }
            this.physicsAggBox.shape.dispose();
            this.physicsAggBox.dispose();
            this.physicsAggBox = null;
        }
    
        if (this.physicsDistanceJoint) {
            this.physicsDistanceJoint.dispose();
            this.physicsDistanceJoint = null;
        }

        this.scene = null;
    }
}
