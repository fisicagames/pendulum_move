import { Mesh, Vector3 } from "@babylonjs/core";
import { GravityType } from "../Controller/GravityType";
import { SoundLoader } from "../Core/SoundLoader";

export interface IModel {
    toggleMusicPlayback(): void;
    applyForce(force: Vector3): void;
    setScoreUpdateCallback(callback: (newScore: number) => void): void;
    onSpherePlayerMeshReady(callback: (mesh: Mesh) => void): void; 
    restartModels(): void;
    setEndGameCallback(callback: (isVisible: boolean) => void): void;
    setGravity(gravity: GravityType): void;
    backgroundMusic: SoundLoader;
}
