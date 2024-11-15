import { Scene, Mesh, MeshBuilder, StandardMaterial, Color3, Vector3, PhysicsAggregate, PhysicsShapeType, PhysicsMotionType } from "@babylonjs/core";

export class Road {
    private scene: Scene;
    private roadBlocks: Mesh[] = [];
    private roadPhysicsAggregate: PhysicsAggregate;
    private roadPhysicsAggregateL: PhysicsAggregate;
    private roadPhysicsAggregateR: PhysicsAggregate;
    private lightMaterial: StandardMaterial;
    private darkMaterial: StandardMaterial;

    constructor(scene: Scene) {
        this.scene = scene;
        this.initializeMaterials();  // Inicializa os materiais antes de criar a estrada
        this.createRoad();
    }

    private initializeMaterials(): void {
        // Inicializa um material claro
        this.lightMaterial = new StandardMaterial("lightMaterial", this.scene);
        this.lightMaterial.diffuseColor = new Color3(0.6, 0.6, 0.8);

        // Inicializa um material escuro
        this.darkMaterial = new StandardMaterial("darkMaterial", this.scene);
        this.darkMaterial.diffuseColor = new Color3(0.4, 0.4, 0.8);
    }

    private createRoad(): void {
        const numberOfBlocks = 50;  // Número de blocos na estrada
        const blockWidth = 8;  // Largura de cada bloco
        const blockDepth = 17;  // Profundidade de cada bloco
        const blockHeight = 0.3;  // Altura de cada bloco

        for (let i = 0; i < numberOfBlocks; i++) {
            const block = MeshBuilder.CreateBox(`roadBlock${i}`, { height: blockHeight, width: blockWidth, depth: blockDepth }, this.scene);
            block.position = new Vector3(i * blockWidth - 15, -3, 0);            
            const blockL = MeshBuilder.CreateBox(`roadBlockL${i}`, { height: blockHeight * 6, width: blockWidth, depth: 2 }, this.scene);
            blockL.position = new Vector3(i * blockWidth - 15, -3.5, 9.5);
            const blockR = MeshBuilder.CreateBox(`roadBlockR${i}`, { height: blockHeight * 6, width: blockWidth, depth: 2 }, this.scene);
            blockR.position = new Vector3(i * blockWidth - 15, -3.5, -9.5);

            // Atribui o material claro ou escuro com base na posição do bloco
            const material = i % 2 === 0 ? this.lightMaterial : this.darkMaterial;
            block.material = material;
            blockL.material = material;
            blockR.material = material;

            // Configurações de física para cada bloco
            this.roadPhysicsAggregate = new PhysicsAggregate(block, PhysicsShapeType.BOX, { mass: 1, friction: 1.0 }, this.scene);
            this.roadPhysicsAggregateL = new PhysicsAggregate(blockL, PhysicsShapeType.BOX, { mass: 1, friction: 1.0 }, this.scene);
            this.roadPhysicsAggregateR = new PhysicsAggregate(blockR, PhysicsShapeType.BOX, { mass: 1, friction: 1.0 }, this.scene);
            this.roadPhysicsAggregate.body.setMotionType(PhysicsMotionType.ANIMATED);
            this.roadPhysicsAggregateL.body.setMotionType(PhysicsMotionType.ANIMATED);
            this.roadPhysicsAggregateR.body.setMotionType(PhysicsMotionType.ANIMATED);

            this.roadBlocks.push(block);
        }
    }

    public getBlocks(): Mesh[] {
        return this.roadBlocks;
    }
}
