import { Mesh } from "@babylonjs/core";
import { SpherePlayer } from "./SpherePlayer";

export interface IModel {
    toggleMusicPlayback(): void;
    spherePlayer: SpherePlayer;
}
