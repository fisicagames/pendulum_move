import { Scene, StandardMaterial, Texture } from "@babylonjs/core";
import { SpherePlayer } from "./SpherePlayer";

export class SpherePlayerManager {
    private scene: Scene;
    private material: StandardMaterial; // Material persistente
    public spherePlayer: SpherePlayer;

    constructor(scene: Scene) {
        this.scene = scene;

        // Criação do material persistente
        this.material = new StandardMaterial(`spherePlayerMaterial`, this.scene);
        this.material.diffuseTexture = new Texture("./assets/textures/textura-bola.jpg", this.scene);
        this.material.reflectionTexture = null;
        this.material.refractionTexture = null;
        this.material.needDepthPrePass = false;
    }

    public createSpherePlayer(): SpherePlayer {
        this.spherePlayer = new SpherePlayer(this.scene, this.material); // Passa o material no construtor
        return this.spherePlayer;
    }

    public dispose(): void {
        // Remove o material persistente
        if (this.material) {
            this.material.diffuseTexture?.dispose();
            this.material.dispose();
        }
    }
}
