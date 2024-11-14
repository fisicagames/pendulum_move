// src/Model/IModel.ts
import { Vector3 } from "@babylonjs/core";
import { SpherePlayer } from "./SpherePlayer";

export interface IModel {
    toggleMusicPlayback(): void;
    spherePlayer: SpherePlayer;
    applyForce(force: Vector3): void;
}
