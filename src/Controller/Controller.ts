// src\Controller\Controller.ts
import { FollowCamera, Scene, Vector3 } from "@babylonjs/core";
import { IModel } from "../Model/IModel";
import { IView } from "../View/IView";
import { LanguageSwitcher } from "../View/LanguageSwitcher"; // Importa a classe GuiLanguage

export class Controller {
    private model: IModel;
    private view: IView;
    private scene: Scene;
    private languageSwitcher: LanguageSwitcher; // Adiciona GuiLanguage

    constructor(scene: Scene, model: IModel, view: IView) {
        this.scene = scene;
        this.model = model;
        this.view = view;
        this.languageSwitcher = new LanguageSwitcher();
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
        const camera = this.scene.activeCamera as FollowCamera;
        camera.target = new Vector3(0, 0, 0);
    }

    private handleMenuButton() {
        this.view.updateMainMenuVisibility(true);
    }

    private handleLangButton() {
        // Chama a função de troca de idioma que já foi implementada
        this.languageSwitcher.changeLanguage(this.view.advancedTexture); // Chama a função de troca de idioma
    }
}
