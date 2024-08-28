import { FollowCamera, Scene, Vector3 } from "@babylonjs/core";
import { Model } from "../Model/Model";
import { IView } from "../View/IView";

export class Controller {
    private model: Model;
    private view: IView;
    private scene: Scene;

    constructor(scene: Scene, model: Model, view: IView) {
        this.scene = scene;
        this.model = model;
        this.view = view;
        this.setupEventHandlers();
    }

    // Configura os event handlers para a GUI usando callbacks
    private setupEventHandlers() {
        this.view.onButtonMenuStart(() => this.handleStartButton());
        this.view.onButtonMenu(() => this.handleMenuButton());
        this.view.onToggleMusic(() => this.model.backgroundMusic.togglePlayback());
    }

    private handleStartButton() {
        this.view.updateMainMenuVisibility(false);
        const camera = this.scene.activeCamera as FollowCamera;
        camera.target = new Vector3(0, 0, 0);
    }

    private handleMenuButton() {
        this.view.updateMainMenuVisibility(true);
    }

}
