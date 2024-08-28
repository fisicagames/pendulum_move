import { Mesh, MeshBuilder, Scene } from "@babylonjs/core";
import { SoundLoader } from "../Core/SoundLoader";
import { IModel } from "./IModel";

export class Model implements IModel {
    private scene: Scene;
    public backgroundMusic: SoundLoader;
    private allSounds: SoundLoader[] = [];
    
    constructor(scene: Scene) {
        this.scene = scene;
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);       
        this.backgroundMusic = new SoundLoader(this.scene,
        "backgroundSound", "./assets/sounds/motivational-day-112790_compress.mp3", true);
        this.allSounds.push(this.backgroundMusic);
    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
    }
}
