// src\MVC.ts
import { HavokPlugin, Scene } from "@babylonjs/core";
import { Controller } from "./Controller/Controller";
import { Model } from "./Model/Model";
import { IModel } from "./Model/IModel";
import { View } from "./View/View";
import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { ViewLanguageSwitcher } from "./View/ViewLanguageSwitcher"; // Importa a classe GuiLanguage

export class MVC {
    private scene: Scene;
    private model: Model;
    private view: View;
    private controller: Controller;
    private advancedTexture: AdvancedDynamicTexture;

    constructor(scene: Scene, advancedTexture: AdvancedDynamicTexture, physicsPlugin: HavokPlugin ) {
        this.scene = scene;
        this.advancedTexture = advancedTexture;
        this.model = new Model(this.scene, physicsPlugin);  // Model implements IModel
        this.view = new View(this.scene, this.advancedTexture);
        this.controller = new Controller(this.scene, this.model, this.view); // Passa GuiLanguage para o Controller
    }
}
