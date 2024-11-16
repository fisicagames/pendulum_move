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
        this.initializeMaterials(); // Inicializa os materiais antes de criar as estradas
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
            const road = new Road(this.scene, i * blockWidth - 15, {
                light: this.lightMaterial,
                dark: this.darkMaterial,
            });

            // Configura o nó pai para os blocos da estrada
            road.blocks.forEach((block) => block.setParent(this.roadBlocksNode));

            // Adiciona à lista de estradas
            this.roadBlocks.push(road);
        }
    }

    public getRoads(): Road[] {
        return this.roadBlocks;
    }
}
