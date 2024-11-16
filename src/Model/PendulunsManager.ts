// src/Model/PendulumsManager.ts
import { Color3, Scene, StandardMaterial, TransformNode } from "@babylonjs/core";
import { Pendulum } from "./Pendulum";

export class PendulumsManager {
    private scene: Scene;
    private pendulums: Pendulum[] = [];
    private pendulumsNode: TransformNode;
    private material: StandardMaterial;

    constructor(scene: Scene) {
        this.scene = scene;
        this.pendulumsNode = new TransformNode("PendulumsNode", this.scene);
        this.material = new StandardMaterial(`cylinderPendulumMassMaterial`, this.scene);
        this.material.diffuseColor = new Color3(0.9, 0.1, 0.1);
        this.initializePendulums();
    }

    private initializePendulums(): void {
        const pendulumPositions = [0, 20, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180];
        pendulumPositions.forEach((pos) => {
            this.pendulums.push(new Pendulum(this.scene, pos, this.pendulumsNode, this.material));
        });
    }

    public updatePendulums(): void {
        this.pendulums.forEach(pendulum => {
            pendulum.adjustPendulumRodAngle();
        });
    }

    public getPendulums(): Pendulum[] {
        return this.pendulums;
    }
    public createNewPendulum(pos){
        this.pendulums.push(new Pendulum(this.scene, pos, this.pendulumsNode, this.material));             
    }
}
