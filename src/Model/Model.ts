// src\Model\Model.ts
import { Scene, HavokPlugin, MeshBuilder, StandardMaterial, Color3, Vector3, PhysicsBody, PhysicsMotionType, Quaternion, PhysicsShapeBox, PhysicsMaterialCombineMode, Mesh, KeyboardEventTypes, PhysicsShapeSphere, Texture } from "@babylonjs/core";
import { IModel } from "./IModel";
import { SoundLoader } from "../Core/SoundLoader";
import { Pendulum } from "./Pendulum";
import { Road } from "./Road";  // Importa a nova classe Road

export class Model implements IModel {
    private scene: Scene;
    public backgroundMusic: SoundLoader;
    private allSounds: SoundLoader[] = [];
    private physicsPlugin: HavokPlugin;
    private pendulums: Pendulum[] = [];
    private road: Road;  
    public spherePhysicsBody: PhysicsBody;
    public spherePlayer: Mesh;
    private velocityX: number;

    constructor(scene: Scene, physicsPlugin: HavokPlugin) {
        this.scene = scene;
        this.physicsPlugin = physicsPlugin;
        this.backgroundMusic = new SoundLoader(this.scene, "backgroundSound", "./assets/sounds/motivational-day-112790_compress.mp3", true);
        this.allSounds.push(this.backgroundMusic);
        this.initializeObstacles();
        this.road = new Road(this.scene);

        //Create main sphere: the player
        this.spherePlayer = MeshBuilder.CreateSphere("sphere", { diameter: 1, segments: 16 }, scene);
        this.spherePlayer.position = new Vector3(-15,-1,0);
        
        const material = new StandardMaterial(`spherePlayerMaterial`, this.scene);
        //material.diffuseColor = new Color3(0.1, 0.9, 0.1);
        material.diffuseTexture = new Texture("./assets/textures/soccerball.jpg");
        this.spherePlayer.material = material;

        this.spherePhysicsBody = new PhysicsBody(this.spherePlayer, PhysicsMotionType.DYNAMIC, false, this.scene);
        this.spherePhysicsBody.setMassProperties({
            mass: 1,
            centerOfMass: new Vector3(0, 0, 0),
            inertia: new Vector3(0.1, 0.1, 0.1),
            inertiaOrientation: new Quaternion(0, 0, 0, 1)            
        });
       
        const boxPhysicsShape = new PhysicsShapeSphere(
            new Vector3(0, 0, 0),   // center of the sphere
            0.5,                              // radius of the sphere
            this.scene                           // scene of the shape
        );

        const boxPhysicsMaterial = {
            friction: 1.0,
            staticFriction: 1.0,
            //frictionCombine: PhysicsMaterialCombineMode.MAXIMUM,
            restitution: 0.1
        };
        boxPhysicsShape.material = boxPhysicsMaterial;
        this.spherePhysicsBody.shape = boxPhysicsShape;
        this.spherePhysicsBody.setAngularDamping(0.8);
        this.spherePhysicsBody.setCollisionCallbackEnabled(true)
        //end main sphere.

        this.keyboardInput();

        this.updateModels();
        



    }
    private updateModels() {
        this.velocityX = 5;
        this.scene.onBeforeRenderObservable.add(() => {
            //this.velocityX += 0.01;
            //this.spherePhysicsBody.setLinearVelocity(new Vector3(this.velocityX, 0, 0));

        });


    }
    private keyboardInput() {
        this.scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case KeyboardEventTypes.KEYDOWN:
                    switch (kbInfo.event.key) {
                        case "w":
                            if (this.spherePlayer.position.z>2){
                                this.spherePhysicsBody.applyForce(new Vector3(25, -10, -10),this.spherePlayer.absolutePosition);
                            }
                            else if (this.spherePlayer.position.z<-2){
                                this.spherePhysicsBody.applyForce(new Vector3(25, -10, 10),this.spherePlayer.absolutePosition);
                            }
                            else{
                                this.spherePhysicsBody.applyForce(new Vector3(25, -10, 0),this.spherePlayer.absolutePosition);
                            }
                            
                            break;
                        case "s":
                            if(this.spherePhysicsBody.getLinearVelocity().x > 0){
                                this.spherePhysicsBody.applyForce(new Vector3(-25, -10, 0),this.spherePlayer.absolutePosition);
                            }
                            break;
                        case "a":
                            this.spherePhysicsBody.applyForce(new Vector3(0, -10, 25),this.spherePlayer.absolutePosition);
                            break;
                        case "d":
                            this.spherePhysicsBody.applyForce(new Vector3(0, -10, -25),this.spherePlayer.absolutePosition);                            
                            break;
                        case "d":
                        case "D":
                        case "ArrowRight":

                        default:
                            
                    }
                    break;
            }
        });
    }

    private initializeObstacles(): void {
        const positions = [0, 20, 40, 50];
        positions.forEach((pos, index) => {
            this.pendulums.push(new Pendulum(this.scene, pos));
        });
    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
    }
}
