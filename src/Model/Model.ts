import { Mesh, MeshBuilder, Scene } from "@babylonjs/core";
import { Controller } from "../Controller/Controller";
import { View } from "../View/View";

export class Model{
    private scene: Scene;
    
    constructor(scene: Scene){
        this.scene = scene;
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);       
        
    }

}