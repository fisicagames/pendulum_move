// src/Model/IModel.ts
import { SpherePlayer } from "./SpherePlayer";

export interface IModel {
    toggleMusicPlayback(): void;
    spherePlayer: SpherePlayer;
}
