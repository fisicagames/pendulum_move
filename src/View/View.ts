import { Scene } from "@babylonjs/core";
import { Model } from "../Model/Model";
import { AdvancedDynamicTexture, Button, Rectangle, TextBlock } from "@babylonjs/gui";

export class View {
    private model: Model;
    private scene: Scene;
    private advancedTexture: AdvancedDynamicTexture;
    private rectangleMenu: Rectangle;
    public buttonMenuStart: Button;
    public buttonMenu: Button;
    private textblockLevel: TextBlock;
    private rectangleTouch: Rectangle;
    private rectangleTop: Rectangle;
    public textblockMenuMusic: TextBlock;


    constructor(scene: Scene, advancedTexture: AdvancedDynamicTexture, model: Model) {
        this.scene = scene;
        this.advancedTexture = advancedTexture;
        this.model = model;

        this.initializeGUI();
    }

    private initializeGUI() {
        this.buttonMenuStart = this.advancedTexture.getControlByName("ButtonMenuStart") as Button;
        this.buttonMenu = this.advancedTexture.getControlByName("ButtonMenu") as Button;
        this.rectangleMenu = this.advancedTexture.getControlByName("RectangleMenu") as Rectangle;
        this.rectangleMenu.isVisible = true;
        this.textblockLevel = this.advancedTexture.getControlByName("TextblockLevel") as TextBlock;
        this.textblockLevel.isVisible = false;
        this.rectangleTouch = this.advancedTexture.getControlByName("RectangleTouch") as Rectangle;
        this.rectangleTouch.isVisible = false;
        this.rectangleTop = this.advancedTexture.getControlByName("RectangleTop") as Rectangle;
        this.rectangleTop.isVisible = false;
        this.textblockMenuMusic = this.advancedTexture.getControlByName("TextblockMenuMusic") as TextBlock;



    }

    public updateMainMenuVisibility(isVisible: boolean) {
        this.rectangleMenu.isVisible = isVisible;
        this.buttonMenu.isVisible = !isVisible;
        this.textblockLevel.isVisible = !isVisible;
        this.rectangleTouch.isVisible = !isVisible;
        this.rectangleTop.isVisible = !isVisible;
    }
}
