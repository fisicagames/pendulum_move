import { Engine } from "@babylonjs/core";
import { CanvasInitializer } from "./Core/CanvasInitializer";
import { EngineInitializer } from "./Core/EngineInitializer";
import { InspectorDebugModel } from "./Core/InspectorDebugModel";
import { SceneInitializer } from "./Core/SceneInitializer";

export class Game {
    canvas: HTMLCanvasElement;
    engine: Engine;
    constructor() {
        this.canvas = CanvasInitializer.createAndAdjustCanvas();
        this.engine = EngineInitializer.createEngine(this.canvas);

    }
    public startMainScene() {
        const mainScene = new SceneInitializer(this.canvas, this.engine);
        //TODO: Remove InspectorDebugModel before build!
        //InspectorDebugModel.enable(mainScene.scene); //Shift+d
    }
}

// Export a function to instantiate the Game class
export function startGame(): void {
    const game = new Game();
    game.startMainScene();
}
