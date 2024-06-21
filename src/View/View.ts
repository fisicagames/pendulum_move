import { Scene } from "@babylonjs/core";
import { Model } from "../Model/Model";
import { AdvancedDynamicTexture, Rectangle, Button, TextBlock } from "@babylonjs/gui";

export class View{
    private model: Model;
    private scene: Scene;
    private advancedTexture: AdvancedDynamicTexture;

    constructor(scene:Scene, advancedTexture: AdvancedDynamicTexture,  model: Model){
        this.scene = scene;
        this.advancedTexture = advancedTexture;
        this.model = model;
    }

}