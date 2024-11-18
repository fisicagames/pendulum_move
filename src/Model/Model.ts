import { Scene, HavokPlugin, KeyboardEventTypes, Vector3, Mesh } from "@babylonjs/core";
import { IModel } from "./IModel";
import { SoundLoader } from "../Core/SoundLoader";
import { RoadsManager } from "./RoadsManager";
import { PendulumsManager } from "./PendulunsManager";
import { SpherePlayerManager } from "./SpherePlayerManager";
import { SpherePlayer } from "./SpherePlayer";

export class Model implements IModel {
    private scene: Scene;
    public backgroundMusic: SoundLoader;
    private allSounds: SoundLoader[] = [];
    private physicsPlugin: HavokPlugin;
    private roadManager: RoadsManager;
    public spherePlayerManager: SpherePlayerManager;
    public spherePlayer: SpherePlayer;
    private velocityX: number;
    private pendulumsManager: PendulumsManager;
    private spherePlayerMeshReadyCallback: ((mesh: Mesh) => void) | null = null;


    constructor(scene: Scene, physicsPlugin: HavokPlugin) {
        this.scene = scene;
        this.physicsPlugin = physicsPlugin;
        //https://pixabay.com/pt/music/otimista-moving-on-253731/
        this.backgroundMusic = new SoundLoader(this.scene, "backgroundSound", "./assets/sounds/moving-on-253731.compress.mp3", true);
        this.allSounds.push(this.backgroundMusic);
        this.roadManager = new RoadsManager(this.scene);

        this.pendulumsManager = new PendulumsManager(this.scene);

        this.spherePlayerManager = new SpherePlayerManager(this.scene);
        this.spherePlayerManager.createSpherePlayer();
        this.spherePlayer = this.spherePlayerManager.spherePlayer;

        this.keyboardInput();
        this.updateSceneModels();
    }

    private updateSceneModels() {
        this.velocityX = 5;
        this.scene.onBeforeRenderObservable.add(() => {
            if(this.spherePlayer.mesh.position.y > -3 &&
                Math.abs(this.spherePlayer.mesh.position.y) < 8){
                this.pendulumsManager.updatePendulums(this.spherePlayer.mesh.position.x);
                this.roadManager.updateRoads(this.spherePlayer.mesh.position.x);
            }
            //TODO: else end game!!            
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
                    if (kbInfo.event.key === "w" ||
                        kbInfo.event.key === "W" ||
                        kbInfo.event.key === "ArrowUp" ||
                        kbInfo.event.key === " ") {
                        this.applyForce();
                    }
                    if (kbInfo.event.key === "q"){
                        this.roadManager.removeRoadBlock(4);
                        this.roadManager.removeRoadBlock(6);
                        this.roadManager.removeRoadBlock(8);


                    }
                    break;
            }
        });
    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
    }
    public setScoreUpdateCallback(callback: (newScore: number) => void): void {
        this.pendulumsManager.setOnScoreUpdatedCallback(callback);
    }

    public onSpherePlayerMeshReady(callback: (mesh: Mesh) => void): void {
        this.spherePlayerMeshReadyCallback = callback;
        if (this.spherePlayer) {
            callback(this.spherePlayer.mesh);
        }
    }

    public restartModels(){
        this.roadManager.removeAllRoadBlocks();
        this.roadManager.initializeRoad();
        this.pendulumsManager.removeAllPendulums();
        this.pendulumsManager.initializePendulums();
        this.spherePlayerManager.spherePlayer.remove();
        this.spherePlayer = this.spherePlayerManager.createSpherePlayer();
        if (this.spherePlayerMeshReadyCallback) {
            this.spherePlayerMeshReadyCallback(this.spherePlayer.mesh);
        }
    }
}
