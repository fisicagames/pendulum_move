import { Scene } from "@babylonjs/core";
import { View } from "../View/View";
import { Model } from "../Model/Model";

export class Controller{
    private  model: Model;
    private view: View;
    private scene: Scene;

    constructor(scene: Scene, model: Model, view: View){
        this.scene = scene;
        this.model = model;
        this.view = view;
        

    }
    

}