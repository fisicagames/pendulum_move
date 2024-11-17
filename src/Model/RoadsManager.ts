import { Scene, TransformNode, StandardMaterial, Color3 } from "@babylonjs/core";
import { Road } from "./Road";

export class RoadsManager {
    private scene: Scene;
    private roadBlocks: Road[] = [];
    private roadBlocksNode: TransformNode;
    private lightMaterial: StandardMaterial;
    private darkMaterial: StandardMaterial;

    constructor(scene: Scene) {
        this.scene = scene;
        this.roadBlocksNode = new TransformNode("RoadBlocks", this.scene);
        this.initializeMaterials();
        this.createRoads();
    }

    private initializeMaterials(): void {
        this.lightMaterial = new StandardMaterial("lightMaterial", this.scene);
        this.lightMaterial.diffuseColor = new Color3(0.6, 0.6, 0.8);

        this.darkMaterial = new StandardMaterial("darkMaterial", this.scene);
        this.darkMaterial.diffuseColor = new Color3(0.4, 0.4, 0.8);
    }

    private createRoads(): void {
        const numberOfBlocks = 50;
        const blockWidth = 8;

        for (let i = 0; i < numberOfBlocks; i++) {
            const material = i % 2 === 0 ? this.lightMaterial : this.darkMaterial;
            const road = new Road(this.scene, i * blockWidth - 15, material, this.roadBlocksNode);
            this.roadBlocks.push(road);
        }
    }

    public getRoads(): Road[] {
        return this.roadBlocks;
    }
    public changeRoadPosition(){
        this.roadBlocks[0].dispose();
    }
}
