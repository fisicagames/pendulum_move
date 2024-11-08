// src/Model/PendulumsManager.ts
import { Scene } from "@babylonjs/core";
import { Pendulum } from "./Pendulum";

export class PendulumsManager {
    private scene: Scene;
    private pendulums: Pendulum[] = [];

    constructor(scene: Scene) {
        this.scene = scene;
        this.initializePendulums();
    }

    private initializePendulums(): void {
        const pendulumPositions = [0, 20, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180];
        pendulumPositions.forEach((pos, index) => {
            this.pendulums.push(new Pendulum(this.scene, pos));
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
}
