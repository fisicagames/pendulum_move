// src\Model\Model.ts
import { Scene, HavokPlugin } from "@babylonjs/core";
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
    private road: Road;  // Uso da nova classe Road

    constructor(scene: Scene, physicsPlugin: HavokPlugin) {
        this.scene = scene;
        this.physicsPlugin = physicsPlugin;
        this.backgroundMusic = new SoundLoader(this.scene, "backgroundSound", "./assets/sounds/motivational-day-112790_compress.mp3", true);
        this.allSounds.push(this.backgroundMusic);
        this.initializeObstacles();
        this.road = new Road(this.scene);  // Criação da estrada usando a nova classe
    }

    private initializeObstacles(): void {
        const positions = [0, 20, 40, 50];
        positions.forEach((pos, index) => {
            this.pendulums.push(new Pendulum(this.scene, pos, this.physicsPlugin));
        });
    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
    }
}
