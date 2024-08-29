import { DistanceConstraint, HavokPlugin, Mesh, MeshBuilder, PhysicsAggregate, PhysicsShapeType, Scene } from "@babylonjs/core";
import { SoundLoader } from "../Core/SoundLoader";
import { IModel } from "./IModel";

export class Model implements IModel {
    private scene: Scene;
    public backgroundMusic: SoundLoader;
    private allSounds: SoundLoader[] = [];
    private physicsPlugin: HavokPlugin;
    
    constructor(scene: Scene, physicsPlugin: HavokPlugin) {
        this.scene = scene;
        this.physicsPlugin = physicsPlugin;
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);       
        this.backgroundMusic = new SoundLoader(this.scene,
        "backgroundSound", "./assets/sounds/motivational-day-112790_compress.mp3", true);
        this.allSounds.push(this.backgroundMusic);
        this.createPendulums();
    }
    createPendulums() {

        const scene = this.scene;
        const pos = 0;
        const NUM_OF_BALLS = 15;
        const i = 0;

        let box1 = MeshBuilder.CreateBox("distanceBox"+i, {size: 1}, scene);
        box1.position.x = pos*1.2 - NUM_OF_BALLS/2;
        box1.position.y = 1;
        box1.position.z = 0;

    
        //let sphere1 = BABYLON.MeshBuilder.CreateCylinder("distanceSphere"+i, {diameter: 1}, scene);
        let sphere1 = MeshBuilder.CreateCylinder("distanceSphere"+i, {height: 1, diameter: 1}, scene);
        sphere1.position.x = pos*1.2 - NUM_OF_BALLS/2;
        sphere1.position.y = 1;
        sphere1.position.z = -2;

    
        var pendulumRod = MeshBuilder.CreateCylinder("pendulumRod"+i, { height: 3 + pos/2, diameter: 0.1, tessellation: 32 }, scene);
        
    
        let agg1 = new PhysicsAggregate(
            sphere1,
            PhysicsShapeType.SPHERE,
            { mass: 1, restitution: 0.9 },
            scene
        );
    
        let agg2 = new PhysicsAggregate(
            box1,
            PhysicsShapeType.BOX,
            { mass: 0, restitution: 0.9 },
            scene
        );
    
        let distanceJoint = new DistanceConstraint(3 + pos/2, scene);
        agg1.body.addConstraint(agg2.body, distanceJoint);
    

    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
    }
}
