// src/Model/PendulumsManager.ts
import { Color3, Scene, StandardMaterial, TransformNode } from "@babylonjs/core";
import { Pendulum } from "./Pendulum";

export class PendulumsManager {
    private scene: Scene;
    private pendulums: Pendulum[] = [];
    private pendulumsNode: TransformNode;
    private material: StandardMaterial;
    public totalScore: number = 0;
    private xDecrement: number = 20;
    private onScoreUpdatedCallback?: (newScore: number) => void;

    constructor(scene: Scene) {
        this.scene = scene;
        this.pendulumsNode = new TransformNode("PendulumsNode", this.scene);
        this.material = this.createMaterial();
        this.initializePendulums();
    }

    private createMaterial(): StandardMaterial {
        const material = new StandardMaterial(`cylinderPendulumMassMaterial`, this.scene);
        material.diffuseColor = new Color3(0.9, 0.1, 0.1);
        material.reflectionTexture = null;
        material.refractionTexture = null;
        material.needDepthPrePass = false;
        return material;
    }

    public initializePendulums(): void {
        this.resetState();
        const pendulumPositions = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180];
        const yPosition = 20;
        pendulumPositions.forEach((xPosition) => {
            this.addPendulum(xPosition, yPosition);
        });
    }

    private resetState(): void {
        this.totalScore = 0;
        this.xDecrement = 20;
        this.removeAllPendulums();
    }

    public updatePendulums(spherePlayerXPosition: number, spherePlayerYPosition: number, isGameOver: boolean): void {
        this.pendulums.forEach((pendulum, index) => {
            pendulum.adjustPendulumRodAngle();
            this.updateScore(pendulum, spherePlayerXPosition, spherePlayerYPosition, isGameOver);
            this.handlePendulumPosition(pendulum, index, spherePlayerXPosition);
        });
    }

    private updateScore(pendulum: Pendulum, spherePlayerX: number, spherePlayerY: number, isGameOver: boolean): void {
        if (!pendulum.hasPlayerScored && !isGameOver &&
            spherePlayerX > pendulum.xPosition && spherePlayerY < pendulum.yPosition) {
            pendulum.hasPlayerScored = true;
            this.incrementScore();
        }
    }

    private incrementScore(): void {
        this.totalScore++;
        if (this.onScoreUpdatedCallback) {
            this.onScoreUpdatedCallback(this.totalScore);
        }
    }

    private handlePendulumPosition(pendulum: Pendulum, index: number, spherePlayerX: number): void {
        if (pendulum.xPosition < spherePlayerX - this.xDecrement - 7) {
            this.removePendulum(index);
            const newYPosition = this.calculateNewYPosition(pendulum.xPosition);
            const newXPosition = this.getNextXPosition();
            this.addPendulum(newXPosition, newYPosition);
        }
    }

    private calculateNewYPosition(currentXPosition: number): number {
        return Math.round(currentXPosition / 300) % 2 === 0 ? 4.0 : 20;
    }

    private getNextXPosition(): number {
        this.xDecrement = Math.max(this.xDecrement - 0.1, 2);
        return this.pendulums[this.pendulums.length - 1]?.xPosition + this.xDecrement || 0;
    }

    private addPendulum(xPosition: number, yPosition: number): void {
        const newPendulum = new Pendulum(this.scene, xPosition, yPosition, this.pendulumsNode, this.material);
        this.pendulums.push(newPendulum);
    }

    public removePendulum(index: number): void {
        if (index >= 0 && index < this.pendulums.length) {
            this.pendulums[index].dispose();
            this.pendulums.splice(index, 1);
        }
    }

    public removeAllPendulums(): void {
        this.pendulums.forEach(pendulum => pendulum.dispose());
        this.pendulums = [];
    }

    public setOnScoreUpdatedCallback(callback: (newScore: number) => void): void {
        this.onScoreUpdatedCallback = callback;
    }

    public getPendulums(): Pendulum[] {
        return this.pendulums;
    }
}