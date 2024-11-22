import { Scene, HavokPlugin, KeyboardEventTypes, Vector3, Mesh, Color4, Color3 } from "@babylonjs/core";
import { IModel } from "./IModel";
import { SoundLoader } from "../Core/SoundLoader";
import { RoadsManager } from "./RoadsManager";
import { PendulumsManager } from "./PendulunsManager";
import { SpherePlayerManager } from "./SpherePlayerManager";
import { SpherePlayer } from "./SpherePlayer";
import { GravityType } from "../Controller/GravityType";

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
    private endGameCallback: ((isVisible: boolean) => void) | null = null;
    public endGAme: boolean = false;

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
                Math.abs(this.spherePlayer.mesh.position.z) < 8 &&
                this.spherePlayer.mesh.position.y < 23){
                this.pendulumsManager.updatePendulums(this.spherePlayer.mesh.position.x,this.spherePlayer.mesh.position.y, this.endGAme);
                this.roadManager.updateRoads(this.spherePlayer.mesh.position.x);
            }
            else if (this.spherePlayer.mesh.position.y < -10 ||
                this.spherePlayer.mesh.position.y > 20 ||
                Math.abs(this.spherePlayer.mesh.position.x) < 20){
                    if (this.endGameCallback) {
                        this.endGameCallback(true);
                        this.endGAme = true;
                    }                
                }
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
        this.endGAme = false;
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

    public setEndGameCallback(callback: (isVisible: boolean) => void): void {
        this.endGameCallback = callback;
    }    

    public setGravity(gravity: GravityType): void {
        if (gravity === GravityType.Earth) {
            this.scene.clearColor = Color4.FromHexString("#5A9BD5");
            this.roadManager.setRoadColors(Color3.FromHexString("#8FB846"), Color3.FromHexString("#64951F"));
        } else if (gravity === GravityType.Moon) {
            this.scene.clearColor = Color4.FromHexString("#090909");
            this.roadManager.setRoadColors(Color3.FromHexString("#A9A9A9"), Color3.FromHexString("#696969")); 
        } else if (gravity === GravityType.Jupiter) {
            this.scene.clearColor = Color4.FromHexString("#A16D3F");
            this.roadManager.setRoadColors(Color3.FromHexString("#8B4513"), Color3.FromHexString("#D2691E")); // Marrom e marrom alaranjado
        }
        this.scene.getPhysicsEngine().setGravity(new Vector3(0,gravity,0));
    }
}
