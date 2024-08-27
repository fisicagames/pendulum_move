import { Scene } from "@babylonjs/core";
import { Model } from "../Model/Model";
import { AdvancedDynamicTexture, Button, Rectangle } from "@babylonjs/gui";

export class View {
    private model: Model;
    private scene: Scene;
    private advancedTexture: AdvancedDynamicTexture;
    public buttonMenuStart: Button;
    private rectangleMenu: Rectangle;

    constructor(scene: Scene, advancedTexture: AdvancedDynamicTexture, model: Model) {
        this.scene = scene;
        this.advancedTexture = advancedTexture;
        this.model = model;

        this.initializeGUI();
    }

    private initializeGUI() {
        this.buttonMenuStart = this.advancedTexture.getControlByName("ButtonMenuStart") as Button;
        this.rectangleMenu = this.advancedTexture.getControlByName("RectangleMenu") as Rectangle;
        this.rectangleMenu.isVisible = true;
    }

    public updateMenuVisibility(isVisible: boolean) {
        this.rectangleMenu.isVisible = isVisible;
    }
}
