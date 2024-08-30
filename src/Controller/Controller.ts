// src\Controller\Controller.ts
import { Scene, Vector3 } from "@babylonjs/core";
import { IModel } from "../Model/IModel";
import { IView } from "../View/IView";

export class Controller {
    private model: IModel;
    private view: IView;
    private scene: Scene;

    constructor(scene: Scene, model: IModel, view: IView) {
        this.scene = scene;
        this.model = model;
        this.view = view;
        this.setupEventHandlers();
    }
    
    private setupEventHandlers() {
        this.view.onButtonMenuStart(() => this.handleStartButton());
        this.view.onButtonMenu(() => this.handleMenuButton());
        this.view.onToggleMusic(() => this.model.toggleMusicPlayback());
        this.view.onButtonLang(() => this.handleLangButton()); // Evento para o botão de idioma
    }

    private handleStartButton() {
        this.view.updateMainMenuVisibility(false);
        this.view.setCameraTarget(this.model.spherePlayer);
    }

    private handleMenuButton() {
        this.view.updateMainMenuVisibility(true);
    }

    private handleLangButton() {
        this.view.changeLanguage();
    }
}
