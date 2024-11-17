// src/Model/SpherePlayer.ts
import { Scene, Mesh, MeshBuilder, StandardMaterial, Vector3, PhysicsBody, PhysicsMotionType, Quaternion, PhysicsShapeSphere, Texture, HavokPlugin } from "@babylonjs/core";

export class SpherePlayer {
    public mesh: Mesh;
    public physicsBody: PhysicsBody;

    private static readonly FORCE_X = 25;
    private static readonly FORCE_Y = -10;
    private static readonly FORCE_Z_POSITIVE = 20;
    private static readonly FORCE_Z_NEGATIVE = -20;

    constructor(scene: Scene) {
        // Criação do mesh da esfera
        this.mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1, segments: 16 }, scene);
        this.mesh.position = new Vector3(-15, -1, 0);
        this.mesh.rotate(new Vector3(1, 0, 0), 10);

        // Configuração do material da esfera
        const material = new StandardMaterial(`spherePlayerMaterial`, scene);
        material.diffuseTexture = new Texture("./assets/textures/textura-bola.jpg");
        this.mesh.material = material;
        material.reflectionTexture = null;
        material.refractionTexture = null;
        material.needDepthPrePass = false;
       

        // Configuração do corpo de física da esfera
        this.physicsBody = new PhysicsBody(this.mesh, PhysicsMotionType.DYNAMIC, false, scene);
        this.physicsBody.setMassProperties({
            mass: 0.3,
            centerOfMass: new Vector3(0, 0, 0),
            inertia: new Vector3(0.1, 0.1, 0.1),
            inertiaOrientation: new Quaternion(0, 0, 0, 1)
        });

        // Configuração da forma física da esfera
        const spherePhysicsShape = new PhysicsShapeSphere(
            new Vector3(0, 0, 0),   // centro da esfera
            0.5,                    // raio da esfera
            scene                   // cena da forma
        );

        const spherePhysicsMaterial = {
            friction: 1.0,
            staticFriction: 1.0,
            restitution: 0.1
        };
        spherePhysicsShape.material = spherePhysicsMaterial;
        this.physicsBody.shape = spherePhysicsShape;
        this.physicsBody.setAngularDamping(0.8);
        this.physicsBody.setCollisionCallbackEnabled(true);
    }

    public applyForce(): void {
        let forceAccumulator = new Vector3(0, 0, 0);
        if (this.mesh.position.z > 2) {
            forceAccumulator.addInPlace(new Vector3(SpherePlayer.FORCE_X, SpherePlayer.FORCE_Y, SpherePlayer.FORCE_Z_POSITIVE));
        } else if (this.mesh.position.z < -2) {
            forceAccumulator.addInPlace(new Vector3(SpherePlayer.FORCE_X, SpherePlayer.FORCE_Y, SpherePlayer.FORCE_Z_NEGATIVE));
        } else {
            forceAccumulator.addInPlace(new Vector3(SpherePlayer.FORCE_X, SpherePlayer.FORCE_Y, 0));
        }
        this.physicsBody.applyForce(forceAccumulator, this.mesh.absolutePosition);
 
    }
}
