// src/Model/Model.ts
import { Scene, HavokPlugin, KeyboardEventTypes, Vector3 } from "@babylonjs/core";
import { IModel } from "./IModel";
import { SoundLoader } from "../Core/SoundLoader";
import { Pendulum } from "./Pendulum";
import { Road } from "./Road";
import { SpherePlayer } from "./SpherePlayer";  // Importa o novo módulo SpherePlayer

export class Model implements IModel {
    private scene: Scene;
    public backgroundMusic: SoundLoader;
    private allSounds: SoundLoader[] = [];
    private physicsPlugin: HavokPlugin;
    private pendulums: Pendulum[] = [];
    private road: Road;
    public spherePlayer: SpherePlayer;  // Instância da classe SpherePlayer
    private velocityX: number;

    constructor(scene: Scene, physicsPlugin: HavokPlugin) {
        this.scene = scene;
        this.physicsPlugin = physicsPlugin;
        this.backgroundMusic = new SoundLoader(this.scene, "backgroundSound", "./assets/sounds/motivational-day-112790_compress.mp3", true);
        this.allSounds.push(this.backgroundMusic);
        this.initializePendulums();
        this.road = new Road(this.scene);

        // Criação da esfera principal do jogador usando SpherePlayer
        this.spherePlayer = new SpherePlayer(scene, physicsPlugin);

        this.keyboardInput();
        this.updateModels();
        
    }

    private updateModels() {
        this.velocityX = 5;
        this.scene.onBeforeRenderObservable.add(() => {
            // Atualização da velocidade da esfera principal, se necessário
        });
    }

    private keyboardInput() {
        this.scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case KeyboardEventTypes.KEYDOWN:
                    switch (kbInfo.event.key) {
                        case "w":
                            if (this.spherePlayer.mesh.position.z > 2) {
                                this.spherePlayer.physicsBody.applyForce(new Vector3(25, -10, -10), this.spherePlayer.mesh.absolutePosition);
                            } else if (this.spherePlayer.mesh.position.z < -2) {
                                this.spherePlayer.physicsBody.applyForce(new Vector3(25, -10, 10), this.spherePlayer.mesh.absolutePosition);
                            } else {
                                this.spherePlayer.physicsBody.applyForce(new Vector3(25, -10, 0), this.spherePlayer.mesh.absolutePosition);
                            }
                            break;
                        case "s":
                            if (this.spherePlayer.physicsBody.getLinearVelocity().x > 0) {
                                this.spherePlayer.physicsBody.applyForce(new Vector3(-25, -10, 0), this.spherePlayer.mesh.absolutePosition);
                            }
                            break;
                        case "a":
                            this.spherePlayer.physicsBody.applyForce(new Vector3(0, -10, 25), this.spherePlayer.mesh.absolutePosition);
                            break;
                        case "d":
                            this.spherePlayer.physicsBody.applyForce(new Vector3(0, -10, -25), this.spherePlayer.mesh.absolutePosition);
                            break;
                    }
                    break;
            }
        });
    }

    private initializePendulums(): void {
        const pendulumPositions = [0, 20, 40, 60];//, 40, 50, 60, 70, 80, 100];
        pendulumPositions.forEach((pos, index) => {
            this.pendulums.push(new Pendulum(this.scene, pos));
        });

        this.scene.registerBeforeRender(() => {
            this.pendulums.forEach(pendulum => {
                pendulum.adjustPendulumRodAngle();
            });
        });
    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
    }
}
