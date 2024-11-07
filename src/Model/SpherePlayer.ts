// src\Model\SpherePlayer.ts
import { Scene, HavokPlugin, Mesh, MeshBuilder, StandardMaterial, Vector3, Quaternion, PhysicsBody, PhysicsMotionType, PhysicsShapeSphere, Texture } from "@babylonjs/core";

export class SpherePlayer {
    public mesh: Mesh;
    public physicsBody: PhysicsBody;

    constructor(scene: Scene, physicsPlugin: HavokPlugin) {
        // Cria a esfera principal
        this.mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1, segments: 16 }, scene);
        this.mesh.position = new Vector3(-15, -1, 0);
        this.mesh.rotate(new Vector3(1, 0, 0), 10);

        // Define o material e textura da esfera
        const material = new StandardMaterial("spherePlayerMaterial", scene);
        material.diffuseTexture = new Texture("./assets/textures/textura-bola.jpg", scene);
        this.mesh.material = material;

        // Cria o corpo de física para a esfera
        this.physicsBody = new PhysicsBody(this.mesh, PhysicsMotionType.DYNAMIC, false, scene);
        this.physicsBody.setMassProperties({
            mass: 1,
            centerOfMass: new Vector3(0, 0, 0),
            inertia: new Vector3(0.1, 0.1, 0.1),
            inertiaOrientation: new Quaternion(0, 0, 0, 1)
        });

        const spherePhysicsShape = new PhysicsShapeSphere(
            new Vector3(0, 0, 0),   // centro da esfera
            0.5,                    // raio da esfera
            scene                   // cena da forma
        );

        spherePhysicsShape.material = {
            friction: 1.0,
            staticFriction: 1.0,
            restitution: 0.1
        };

        this.physicsBody.shape = spherePhysicsShape;
        this.physicsBody.setAngularDamping(0.8);
        this.physicsBody.setCollisionCallbackEnabled(true);
    }
}
