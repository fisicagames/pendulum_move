import { CanvasInitializer } from "./Core/CanvasInitializer";
import { EngineInitializer } from "./Core/EngineInitializer";
import { SceneInitializer } from "./Core/SceneInitializer";

export class Game {
    constructor() {
        const canvas = CanvasInitializer.createAndAdjustCanvas();
        const engine = EngineInitializer.createEngine(canvas);
        const mainScene = new SceneInitializer(canvas, engine);
        //InspectorDebugModel.enable(mainScene.scene); //Shift+d
    }
}

// Export a function to instantiate the Game class
export function startGame(): void {
    new Game();
}
