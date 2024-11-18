import { Scene, TransformNode, StandardMaterial, Color3 } from "@babylonjs/core";
import { Road } from "./Road";

export class RoadsManager {
    private scene: Scene;
    private roadBlocks: Road[] = [];
    private roadBlocksNode: TransformNode;
    private lightMaterial: StandardMaterial;
    private darkMaterial: StandardMaterial;
    private blockWidth: number = 8;

    constructor(scene: Scene) {
        this.scene = scene;
        this.roadBlocksNode = new TransformNode("RoadBlocks", this.scene);
        this.initializeMaterials();
        this.initializeRoad();
    }

    private initializeMaterials(): void {
        this.lightMaterial = new StandardMaterial("lightMaterial", this.scene);
        this.lightMaterial.diffuseColor = new Color3(118/210, 152/210, 58/210);
        this.lightMaterial.reflectionTexture = null;
        this.lightMaterial.refractionTexture = null;
        this.lightMaterial.needDepthPrePass = false;  

        this.darkMaterial = new StandardMaterial("darkMaterial", this.scene);
        this.darkMaterial.diffuseColor = new Color3(83/210, 123/210, 26/210);
        this.darkMaterial.reflectionTexture = null;
        this.darkMaterial.refractionTexture = null;
        this.darkMaterial.needDepthPrePass = false;  
    }

    public initializeRoad(): void {
        const numberOfBlocks = 50;
        

        for (let i = 0; i < numberOfBlocks; i++) {
            const material = i % 2 === 0 ? this.lightMaterial : this.darkMaterial;
            const road = new Road(this.scene, i * this.blockWidth - 15, material, this.roadBlocksNode);
            this.roadBlocks.push(road);
        }
    }

    public getRoads(): Road[] {
        return this.roadBlocks;
    }
    public removeRoadBlock(index){
        if (index >= 0 && index < this.roadBlocks.length) {
            const roadBlock = this.roadBlocks[index];
            roadBlock.removeBlock(); // Chama o método dispose do pêndulo
            this.roadBlocks.splice(index, 1); // Remove do array
            this.createNewRoadBlock();
        }
    }
    public createNewRoadBlock(): void {
        const lastRoadPositionX = this.roadBlocks[this.roadBlocks.length - 1]?.positionX;
        const material = (lastRoadPositionX+15)/this.blockWidth % 2 === 0 ? this.darkMaterial:this.lightMaterial;
        const road = new Road(this.scene, lastRoadPositionX + this.blockWidth, material, this.roadBlocksNode);
        this.roadBlocks.push(road);
    }
    public updateRoads(spherePlayerXPosition: number) {
        this.roadBlocks.forEach((road, index) => {
            if (road.positionX < spherePlayerXPosition - 100) {
                this.removeRoadBlock(index);
               
            }
        });    
    }
    public removeAllRoadBlocks(): void {
        this.roadBlocks.forEach((roadBlock) => {
            roadBlock.removeBlock();
        });
    
        this.roadBlocks = [];
    }
}
