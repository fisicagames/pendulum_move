import { Scene, Mesh, MeshBuilder, StandardMaterial, Color3, Vector3 } from "@babylonjs/core";

export class Road {
    private scene: Scene;
    private roadBlocks: Mesh[] = [];

    constructor(scene: Scene) {
        this.scene = scene;
        this.createRoad();
    }

    private createRoad(): void {
        const numberOfBlocks = 20;  // Número de blocos na estrada
        const blockWidth = 8;  // Largura de cada bloco
        const blockDepth = 17;  // Profundidade de cada bloco
        const blockHeight = 0.3;  // Altura de cada bloco

        for (let i = 0; i < numberOfBlocks; i++) {
            const block = MeshBuilder.CreateBox(`roadBlock${i}`, { height: blockHeight, width: blockWidth, depth: blockDepth }, this.scene);
            block.position = new Vector3(i * blockWidth-15, -3, 0);

            // Alterna a cor entre dois tons
            const material = new StandardMaterial(`blockMaterial${i}`, this.scene);
            material.diffuseColor = i % 2 === 0 ? new Color3(0.6, 0.6, 0.8) : new Color3(0.4, 0.4, 0.8);
            block.material = material;

            this.roadBlocks.push(block);
        }
    }

    public getBlocks(): Mesh[] {
        return this.roadBlocks;
    }
}
