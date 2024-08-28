import { Mesh, MeshBuilder, Scene } from "@babylonjs/core";
import { Controller } from "../Controller/Controller";
import { View } from "../View/View";
import { SoundLoader } from "../Core/SoundLoader";


export class Model{
    private scene: Scene;
    public backgroundMusic: SoundLoader;
    public _allSounds: SoundLoader[] = [];
    
    constructor(scene: Scene){
        this.scene = scene;
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);       
        this.backgroundMusic = new SoundLoader(this.scene,
        "backgroundSound", "./assets/sounds/80s-video-game-battle-chiptune-216255_compress.mp3", true);
        this._allSounds.push(this.backgroundMusic);
    }

    public toggleMusicPlayback(): void {
        this.backgroundMusic.togglePlayback();
    }

}