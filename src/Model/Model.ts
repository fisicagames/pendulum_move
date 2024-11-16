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
        //https://pixabay.com/pt/music/otimista-moving-on-253731/
        this.backgroundMusic = new SoundLoader(this.scene, "backgroundSound", "./assets/sounds/moving-on-253731.compress.mp3", true);
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
            this.pendulumsManager.updatePendulums(this.spherePlayer.mesh.position.x);
        });
    }
    public applyForce(): void {
       this.spherePlayer.applyForce();
    }

    private keyboardInput() {
        let forceAccumulator = new Vector3(0, 0, 0);

        this.scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case KeyboardEventTypes.KEYDOWN:
                    if (kbInfo.event.key === "w") {
                        this.applyForce();
                    }
                    break;
            }
        });
    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
    }
}
