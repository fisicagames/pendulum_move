// src/Model/Model.ts
import { Scene, HavokPlugin, KeyboardEventTypes, Vector3 } from "@babylonjs/core";
import { IModel } from "./IModel";
import { SoundLoader } from "../Core/SoundLoader";
import { Road } from "./Road";
import { SpherePlayer } from "./SpherePlayer";  // Importa o novo módulo SpherePlayer
import { PendulumsManager } from "./PendulunsManager";

export class Model implements IModel {
    private scene: Scene;
    public backgroundMusic: SoundLoader;
    private allSounds: SoundLoader[] = [];
    private physicsPlugin: HavokPlugin;
    private road: Road;
    public spherePlayer: SpherePlayer;  // Instância da classe SpherePlayer
    private velocityX: number;
    private pendulumsManager: PendulumsManager; // Instância do PendulumsManager

    constructor(scene: Scene, physicsPlugin: HavokPlugin) {
        this.scene = scene;
        this.physicsPlugin = physicsPlugin;
        this.backgroundMusic = new SoundLoader(this.scene, "backgroundSound", "./assets/sounds/motivational-day-112790_compress.mp3", true);
        this.allSounds.push(this.backgroundMusic);
        this.road = new Road(this.scene);

        this.pendulumsManager = new PendulumsManager(this.scene);

        this.spherePlayer = new SpherePlayer(scene);

        this.keyboardInput();
        this.updateModels();
    }

    private updateModels() {
        this.velocityX = 5;
        this.scene.onBeforeRenderObservable.add(() => {
            this.pendulumsManager.updatePendulums();
        });
    }
    public applyForce(): void {
        let forceAccumulator = new Vector3(0, 0, 0);

        if (this.spherePlayer.mesh.position.z > 2) {
            forceAccumulator.addInPlace(new Vector3(25, -10, -20));
        } else if (this.spherePlayer.mesh.position.z < -2) {
            forceAccumulator.addInPlace(new Vector3(25, -10, 20));
        } else {
            forceAccumulator.addInPlace(new Vector3(25, -10, 0));
        }
        this.spherePlayer.physicsBody.applyForce(forceAccumulator, this.spherePlayer.mesh.absolutePosition);
    }

    private keyboardInput() {
        let forceAccumulator = new Vector3(0, 0, 0);
    
        this.scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case KeyboardEventTypes.KEYDOWN:
                    forceAccumulator.set(0, 0, 0);
    
                    if (kbInfo.event.key === "w") {
                        if (this.spherePlayer.mesh.position.z > 2) {
                            forceAccumulator.addInPlace(new Vector3(25, -10, -10));
                        } else if (this.spherePlayer.mesh.position.z < -2) {
                            forceAccumulator.addInPlace(new Vector3(25, -10, 10));
                        } else {
                            forceAccumulator.addInPlace(new Vector3(25, -10, 0));
                        }
                    }
                    if (kbInfo.event.key === "s") {
                        if (this.spherePlayer.physicsBody.getLinearVelocity().x > 0) {
                            forceAccumulator.addInPlace(new Vector3(-25, -10, 0));
                        }
                    }
                    if (kbInfo.event.key === "a") {
                        forceAccumulator.addInPlace(new Vector3(0, -10, 25));
                    }
                    if (kbInfo.event.key === "d") {
                        forceAccumulator.addInPlace(new Vector3(0, -10, -25));
                    }
   
                    this.spherePlayer.physicsBody.applyForce(forceAccumulator, this.spherePlayer.mesh.absolutePosition);
                    break;
            }
        });
    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
    }
}
