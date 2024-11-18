// src/Model/PendulumsManager.ts
import { Color3, Scene, StandardMaterial, TransformNode } from "@babylonjs/core";
import { Pendulum } from "./Pendulum";

export class PendulumsManager {
    private scene: Scene;
    private pendulums: Pendulum[] = [];
    private pendulumsNode: TransformNode;
    private material: StandardMaterial;
    public totalScore: number = 0;

    constructor(scene: Scene) {
        this.scene = scene;
        this.pendulumsNode = new TransformNode("PendulumsNode", this.scene);
        this.material = new StandardMaterial(`cylinderPendulumMassMaterial`, this.scene);
        this.material.diffuseColor = new Color3(0.9, 0.1, 0.1);
        this.material.reflectionTexture = null;
        this.material.refractionTexture = null;
        this.material.needDepthPrePass = false;        
        this.initializePendulums();
    }

    public initializePendulums(): void {
        this.totalScore = 0;
        const pendulumPositions = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180];
        pendulumPositions.forEach((pos) => {
            this.pendulums.push(new Pendulum(this.scene, pos, this.pendulumsNode, this.material));
        });
    }

    public updatePendulums(spherePlayerXPosition: number): void {
        this.pendulums.forEach((pendulum, index) => {
            pendulum.adjustPendulumRodAngle();
            if (!pendulum.hasPlayerScored){
                if(spherePlayerXPosition > pendulum.xPosition){
                    //TODO: Check hight of spherePlayer and box Pendulum.
                    this.totalScore++;
                    if (this.onScoreUpdatedCallback) {
                        this.onScoreUpdatedCallback(this.totalScore);
                    }                    
                    pendulum.hasPlayerScored = true;
                }
            }
            if (pendulum.xPosition < spherePlayerXPosition - 30) {
                this.removePendulum(index);
                this.createNewPendulum(pendulum.xPosition + 200);
                
            }
        });
    }

    public getPendulums(): Pendulum[] {
        return this.pendulums;
    }
    public createNewPendulum(pos){
        this.pendulums.push(new Pendulum(this.scene, pos, this.pendulumsNode, this.material));
    }

    public removePendulum(index: number): void {
        if (index >= 0 && index < this.pendulums.length) {
            const pendulum = this.pendulums[index];
            pendulum.dispose(); // Chama o método dispose do pêndulo
            this.pendulums.splice(index, 1); // Remove do array
        }
    }
    
    public removeAllPendulums(): void {
        this.pendulums.forEach(pendulum => pendulum.dispose()); // Dispose de todos
        this.pendulums = []; // Limpa o array
    }

    private onScoreUpdatedCallback?: (newScore: number) => void;
    public setOnScoreUpdatedCallback(callback: (newScore: number) => void): void {
        this.onScoreUpdatedCallback = callback;
    }
}
